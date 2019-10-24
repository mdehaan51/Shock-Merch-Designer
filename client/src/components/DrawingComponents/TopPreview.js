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

import { connect } from "react-redux";

class TopPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedShape: ""
		};
	}

	render() {
		// Stage is a div container
		// Layer is actual canvas element (so you may have several canvases in the stage)
		// And then we have canvas shapes inside the Layer
		let primary = this.props.drawing.primary;
		let secondary = this.props.drawing.secondary;
		const topText = this.props.top.text;
		const imageList = this.props.top.images;
		return (
			<div>
				<div className="primary-color">
					<Stage
						width={600}
						height={750}
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
							{/*<Portal>*/}

							{/*<Portal>*/}
							<SockImage2
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								width={750}
								height={600}
								src="images/sockfrontview.png"
								shadowBlur={10}
							/>
							<SockImage2
								blue={secondary.blue}
								red={secondary.red}
								green={secondary.green}
								width={750}
								height={600}
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
											const inputs = this.props.top.text.slice();
											inputs[id] = newAttrs;
											this.props.updateText(inputs);
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
											this.props.selectImage(data.id);
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
											const inputs = this.props.top.images.slice();
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
	top: state.top
});

export default connect(
	mapStateToProps,
	{ updateText, selectText, updateImages, selectImage }
)(TopPreview);
