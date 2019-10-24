import React, { Component } from "react";
import { render } from "react-dom";
import Portal from "./Portal";
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";

import SockImage2 from "./SockImage2";
import { Socks } from "./constants";
import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

import {
	addText,
	updateText,
	selectText,
	addImage,
	updateImages,
	selectImage
} from "../../actions/sideActions";

import { saveData } from "../../actions/drawingActions";

import { connect } from "react-redux";

class SidePreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textItems: [],
			selectedShape: ""
		};
		let stageRef = React.createRef();
	}

	componentWillUnmount() {
		let sideURL = this.refs.sideStage.toDataURL();
		this.props.saveData("side", sideURL);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.side !== this.props.side) {
			let sideURL = this.refs.sideStage.toDataURL();
			this.props.saveData("side", sideURL);
		}
	}

	render() {
		// Stage is a div container
		// Layer is actual canvas element (so you may have several canvases in the stage)
		// And then we have canvas shapes inside the Layer
		const primary = this.props.drawing.primary;
		const secondary = this.props.drawing.secondary;
		const sideText = this.props.side.text;
		const imageList = this.props.side.images;

		return (
			<div>
				<div className="primary-color">
					<Stage ref="sideStage" width={600} height={750}>
						<Layer
							onMouseDown={e => {
								this.setState({
									selectedShape: ""
								});
								this.props.selectText("");
							}}
						>
							<SockImage2
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								width={500}
								height={694}
								src="images/socksideview4.png"
								shadowBlur={10}
							/>
							<SockImage2
								blue={secondary.blue}
								red={secondary.red}
								green={secondary.green}
								width={500}
								height={694}
								src="images/sideheeltoe.png"
								shadowBlur={0}
							/>
						</Layer>
						<Layer>
							{sideText.map((data, id) => {
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
											const inputs = this.props.side.text.slice();
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
											const inputs = this.props.side.images.slice();

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
	side: state.side
});

export default connect(
	mapStateToProps,
	{
		addText,
		updateText,
		selectText,
		addImage,
		updateImages,
		selectImage,
		saveData
	}
)(SidePreview);
