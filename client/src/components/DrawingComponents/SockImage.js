import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";

const URL = "images/WhiteSocks.png";

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
		console.log("image has mounted");
	}

	handleClick = () => {
		// recache shape when we updated it
		this.applyCache();
	};

	componentDidUpdate(prevProps) {
		console.log(this.props);
		if (prevProps !== this.props) {
			this.applyCache();
		}
	}

	loadImage() {
		this.image = new window.Image();
		this.image.src = this.props.src;
		//this.image.addEventListener("load", this.handleLoad);
		this.setState({
			image: this.image
		});
		console.log("image created");
		console.log(this.state.image);
	}

	applyCache() {
		console.log("image cached");
		this.img.cache();
		this.img.getLayer().batchDraw();
	}

	render() {
		console.log(this.state.image);
		return (
			<Image
				filters={[Konva.Filters.RGB]}
				x={10}
				y={10}
				width={800}
				height={800}
				image={this.state.image}
				blue={this.props.blue}
				red={this.props.red}
				green={this.props.green}
				shadowBlur={10}
				ref={node => {
					this.img = node;
				}}
				onClick={this.handleClick}
			/>
		);
	}
}

export default SockImage;
