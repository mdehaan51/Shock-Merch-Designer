import React, { Component } from "react";

import { Stage, Layer } from "react-konva";

import SockImage2 from "./SockImage2";
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
			selectedShape: "",
			width: null,
			height: null
		};
		let stageRef = React.createRef();
	}

	componentDidMount() {
		//console.log(this.refs.stageContainer.offsetWidth);
		this.setState({
			width: this.refs.stageContainer.offsetWidth,
			height: this.refs.stageContainer.offsetHeight
		});
	}

	componentWillUnmount() {
		this.setState({
			selectedShape: ""
		});
		this.props.selectText("");
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
		let scale;
		let sockWidth = 500;
		let sockHeight = 694;
		let screenHeight = 750;
		if (window.innerWidth < 993) {
			sockHeight = this.state.height * 0.9;
			scale = sockHeight / 694;
			sockWidth = Math.min(scale * sockWidth);

			screenHeight = 375;
		}
		let sockImage = "images/socksideview4.png";
		if (this.props.drawing.sockType === "ankle") {
			sockImage = "images/socksideview4-ankle.png";
		}

		return (
			<div>
				<div className="primary-color" ref="stageContainer">
					<Stage
						ref="sideStage"
						width={sockWidth * 1.1}
						height={screenHeight}
					>
						<Layer
							onMouseDown={e => {
								this.setState({
									selectedShape: ""
								});
								this.props.selectText("");
							}}
							onTap={e => {
								this.setState({
									selectedShape: ""
								});
								this.props.selectText("");
							}}
						>
							<SockImage2
								x={10}
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								width={sockWidth}
								height={sockHeight}
								src={sockImage}
								shadowBlur={10}
							/>
							<SockImage2
								x={10}
								blue={secondary.blue}
								red={secondary.red}
								green={secondary.green}
								width={sockWidth}
								height={sockHeight}
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
