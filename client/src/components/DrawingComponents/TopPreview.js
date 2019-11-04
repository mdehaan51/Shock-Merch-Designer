import React, { Component } from "react";
import { render } from "react-dom";
import Portal from "./Portal";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";

import SockImage2 from "./SockImage2";
import { Socks } from "./constants";
import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

import {
	updateText,
	selectText,
	updateImages,
	selectImage
} from "../../actions/topActions";

import { saveData } from "../../actions/drawingActions";

import { connect } from "react-redux";

class TopPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedShape: "",
			width: null,
			height: null
		};
	}
	componentDidMount() {
		this.setState({
			width: this.refs.stageContainer.offsetWidth,
			height: this.refs.stageContainer.offsetHeight
		});
	}
	componentWillUnmount() {
		let sideURL = this.refs.topStage.toDataURL();
		this.props.saveData("top", sideURL);
	}
	componentDidUpdate(prevProps) {
		if (prevProps.side !== this.props.side) {
			let sideURL = this.refs.topStage.toDataURL();
			this.props.saveData("top", sideURL);
		}
	}

	render() {
		// Stage is a div container
		// Layer is actual canvas element (so you may have several canvases in the stage)
		// And then we have canvas shapes inside the Layer
		let primary = this.props.drawing.primary;
		let secondary = this.props.drawing.secondary;
		const topText = this.props.top.text;
		const imageList = this.props.top.images;
		let scale;
		let sockWidth = 213;
		let sockHeight = 600;
		let screenHeight = 750;

		if (window.innerWidth < 993) {
			sockHeight = this.state.height * 0.9;
			scale = sockHeight / 600;

			sockWidth = Math.min(scale * sockWidth);

			screenHeight = 375;
		}

		let sockImage = "images/sockfrontview.png";
		if (this.props.drawing.sockType === "ankle") {
			sockImage = "images/sockfrontview-ankle2.png";
		}
		return (
			<div>
				<div className="primary-color" ref="stageContainer">
					<Stage
						ref="topStage"
						width={sockWidth * 1.1}
						height={screenHeight}
						onMouseDown={e => {
							// deselect when clicked on empty area
							const clickedOnEmpty =
								e.target === e.target.getStage();
							console.log(e.target.getStage());
							if (clickedOnEmpty) {
								this.setState({
									selectedShape: null
								});
							}
						}}
					>
						<Layer>
							<SockImage2
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								width={sockWidth}
								height={sockHeight}
								src={sockImage}
								shadowBlur={10}
							/>
							<SockImage2
								blue={secondary.blue}
								red={secondary.red}
								green={secondary.green}
								width={sockWidth}
								height={sockHeight}
								src="images/sockfrontviewTOE.png"
								shadowBlur={0}
							/>

							{topText.map((data, id) => {
								return (
									<TextElement
										key={id}
										rotation={data.rotation}
										x={data.x}
										y={data.y}
										text={data.text}
										id={data.id}
										textProps={data}
										isSelected={
											data.id === this.state.selectedShape
										}
										onSelect={() => {
											this.setState({
												selectedShape: data.id
											});
											this.props.selectText(data.id);
										}}
										onChange={newAttrs => {
											const inputs = this.props.top.text.slice();
											inputs[id] = newAttrs;
											this.props.updateText(inputs);
										}}
									/>
								);
							})}
							{imageList.map((data, id) => {
								return (
									<ImageElement
										key={id}
										url={data.src}
										shapeProps={data}
										x={data.x}
										y={data.y}
										isSelected={
											data.id === this.state.selectedShape
										}
										onSelect={() => {
											this.setState({
												selectedShape: data.id
											});
											this.props.selectImage(data.id);
										}}
										onChange={newAttrs => {
											const inputs = this.props.top.images.slice();

											inputs[id] = newAttrs;
											this.props.updateImages(inputs);
										}}
									/>
								);
							})}
						</Layer>
					</Stage>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing,
	top: state.top
});

export default connect(
	mapStateToProps,
	{ updateText, selectText, updateImages, selectImage, saveData }
)(TopPreview);
