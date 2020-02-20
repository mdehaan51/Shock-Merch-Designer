import React, { Component } from "react";
import Konva from "konva";
import {  Image } from "react-konva";


class SockImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "green",
			image: null
		};
	}

	componentDidMount() {
		this.loadImage();
		this.applyCache();
	}

	handleClick = () => {
		// recache shape when we updated it
		this.applyCache();
	};

	componentDidUpdate(prevProps) {
		if (prevProps.src !== this.props.src) {
			this.loadImage();
		}
	}

	componentWillUnmount() {
		this.image.removeEventListener("load", this.handleLoad);
	}

	loadImage() {
		this.image = new window.Image();
		this.image.src = this.props.src;
		this.image.addEventListener("load", this.handleLoad);
	}

	handleLoad = () => {
		// after setState react-konva will update canvas and redraw the layer
		// because "image" property is changed
		this.setState({
			image: this.image
		});
		// if you keep same image object during source updates
		// you will have to update layer manually:
		// this.imageNode.getLayer().batchDraw();
	};

	applyCache() {
		this.img.cache();
		this.img.moveToBottom();
		this.img.getLayer().batchDraw();
	}

	render() {
		return (
			<Image
				filters={[Konva.Filters.RGB]}
				x={100}
				y={10}
				width={this.props.width}
				height={this.props.height}
				image={this.state.image}
				blue={this.props.blue}
				red={this.props.red}
				green={this.props.green}
				shadowBlur={this.props.shadowBlur}
				ref={node => {
					this.img = node;
				}}
				onClick={this.handleClick}
			/>
		);
	}
}

export default SockImage;
