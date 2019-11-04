import React, { Component } from "react";
import { render } from "react-dom";
import Portal from "./Portal";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";
import SockImage2 from "./SockImage2";
import { Socks } from "./constants";
import SquareElement from "./TextElement";
import ShapeElement from "./ShapeElement";

import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

import {
	setShapeColor,
	addShape,
	updateShapes,
	addText,
	updateText,
	selectText,
	addImage,
	updateImages,
	selectImage
} from "../../actions/bottomActions";

import { saveData } from "../../actions/drawingActions";

import { connect } from "react-redux";

class BottomPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputShapes: [],
			inputList: [
				{
					x: 10,
					y: 10,
					width: 100,
					height: 100,
					//fill: "red",
					id: "rect1"
				}
			],
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
		this.setState({
			selectedShape: null
		});
		this.props.selectText("");
		let sideURL = this.refs.bottomStage.toDataURL();
		this.props.saveData("bottom", sideURL);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.side !== this.props.side) {
			let sideURL = this.refs.bottomStage.toDataURL();
			this.props.saveData("bottom", sideURL);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.drawing.inputShapes !== this.props.drawing.inputShapes) {
			let newItem = this.props.drawing.inputShapes.slice(-1)[0];
			//this.props.updateShapes(newItem);
			this.setState({
				inputShapes: [...this.state.inputShapes, newItem]
			});
		}
	}

	render() {
		// Stage is a div container
		// Layer is actual canvas element (so you may have several canvases in the stage)
		// And then we have canvas shapes inside the Layer
		const primary = this.props.drawing.primary;
		const secondary = this.props.drawing.secondary;
		const shape = this.props.bottom.shape;
		const shapeList = this.props.bottom.shapes;
		const bottomText = this.props.bottom.text;
		const imageList = this.props.bottom.images;

		let scale;
		let sockWidth = 350;
		let sockHeight = 699;
		let screenHeight = 750;

		if (window.innerWidth < 993) {
			sockHeight = this.state.height * 0.9;
			scale = sockHeight / 699;

			sockWidth = Math.min(scale * sockWidth);
			screenHeight = 375;
		}

		return (
			<div>
				<div className="primary-color" ref="stageContainer">
					<Stage
						ref="bottomStage"
						width={sockWidth * 1.1}
						height={screenHeight}
						onMouseDown={e => {
							// deselect when clicked on empty area
							const clickedOnEmpty =
								e.target === e.target.getStage();

							if (clickedOnEmpty) {
								this.setState({
									selectedShape: null
								});
							}
						}}
					>
						<Layer>
							<SockImage2
								width={sockWidth}
								height={sockHeight}
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								src="images/sockbottom.png"
							/>
							<SockImage2
								width={sockWidth}
								height={sockHeight}
								blue={secondary.blue}
								red={secondary.red}
								green={secondary.green}
								src="images/sockbottomheeltoe.png"
							/>

							{bottomText.map((data, id) => {
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
											const inputs = this.props.bottom.text.slice();
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
										width={100}
										height={100}
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
											const inputs = this.props.bottom.images.slice();
											console.log(inputs);
											console.log(newAttrs);
											inputs[id] = newAttrs;
											this.props.updateImages(inputs);
										}}
									/>
								);
							})}
							{shapeList.map((data, id) => {
								return (
									<ShapeElement
										key={id}
										url={data.src}
										blue={shape.blue}
										red={shape.red}
										green={shape.green}
										hex={shape.hex}
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
										}}
										onChange={newAttrs => {
											const inputs = this.props.bottom.shapes.slice();
											console.log(inputs);
											console.log(newAttrs);
											inputs[id] = newAttrs;
											this.props.updateShapes(inputs);
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
	bottom: state.bottom
});

export default connect(
	mapStateToProps,
	{
		setShapeColor,
		addShape,
		updateShapes,
		addText,
		updateText,
		selectText,
		addImage,
		updateImages,
		selectImage,
		saveData
	}
)(BottomPreview);
