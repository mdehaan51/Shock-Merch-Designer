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
import { addTextNode } from "./TextNode";

import { updateShapes } from "../../actions/drawingActions";
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
			selectedShape: ""
		};
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
		const shape = this.props.drawing.shape;
		const shapeList = this.props.drawing.inputShapes;

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
								width={350}
								height={699}
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								src="images/sockbottom.png"
							/>
							<SockImage2
								width={350}
								height={699}
								blue={secondary.blue}
								red={secondary.red}
								green={secondary.green}
								src="images/sockbottomheeltoe.png"
							/>
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
											const inputs = this.props.drawing.inputShapes.slice();
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
	drawing: state.drawing
});

export default connect(
	mapStateToProps,
	{ updateShapes }
)(BottomPreview);
