import React, { Component } from "react";
import { render } from "react-dom";
import Portal from "./Portal";
import { Stage, Layer, Rect, Text, Image, Group } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";

import SockImage2 from "./SockImage2";
import { Socks } from "./constants";
import TextElement from "./TextElement";
import { addTextNode } from "./TextNode";
import ImageElement from "./ImageElement";

import {
	updateSideText,
	selectText,
	updateImages
} from "../../actions/drawingActions";

import { connect } from "react-redux";

class SidePreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textItems: [],
			selectedShape: ""
		};
		const stageRef = React.createRef();
	}

	render() {
		// Stage is a div container
		// Layer is actual canvas element (so you may have several canvases in the stage)
		// And then we have canvas shapes inside the Layer
		const primary = this.props.drawing.primary;
		const secondary = this.props.drawing.secondary;
		const sideText = this.props.drawing.sideText;
		const imageList = this.props.drawing.sideImages;

		return (
			<div>
				<div className="primary-color">
					<Stage
						ref={this.stageRef}
						width={600}
						height={750}
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
							{/*<Portal>*/}

							{/*<Portal>*/}
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

							{sideText.map((data, id) => {
								console.log(data);
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
											/*let id = data.id;
											let items = this.props.drawing
												.sideText;
											console.log(items);
											let textItem = items.filter(obj => {
												return obj.id === id;
											});
											console.log(textItem);
											console.log(id);
											let index = items.findIndex(
												obj => obj.id === id
											);
											console.log(items);
											items.splice(index, 1);
											console.log(items);
											items.push(textItem[0]);
											console.log(items);
											this.props.updateSideText(items);
											/*let textItems = this.props.drawing
												.sideText;
											let textDetails = textItems.filter(
												obj => {
													return obj.id === data.id;
												}
											);
											this.props.selectText(textDetails);*/
										}}
										onChange={newAttrs => {
											const inputs = this.props.drawing.sideText.slice();
											inputs[id] = newAttrs;
											this.props.updateSideText(inputs);
										}}
									/>
								);
							})}
							{imageList.map((data, id) => {
								console.log(data);
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
											/*let id = this.state.selectedShape;
											let inputShapes = this.state.inputShapes.slice();
											let item = inputShapes.find(
												i => i.id === id
											);
											let index = inputShapes.indexOf(
												item
											);
											inputShapes.splice(index, 1);
											inputShapes.push(item);
											this.setState({
												inputShapes
											});*/
										}}
										onChange={newAttrs => {
											const inputs = this.props.drawing.sideImages.slice();
											console.log(inputs);
											console.log(newAttrs);
											inputs[id] = newAttrs;
											this.props.updateImages(inputs);
										}}
									/>
								);
							})}
						</Layer>
					</Stage>
				</div>
				{/*<div className="secondary-color">
					<Stage width={800} height={800}>
						<Layer>
							<SockImage
								blue={color.blue}
								red={color.red}
								green={color.green}
								src={null}
							/>
						</Layer>
					</Stage>
				</div>*/}
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
	{ updateSideText, selectText, updateImages }
)(SidePreview);
