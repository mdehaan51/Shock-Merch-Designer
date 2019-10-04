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

import { connect } from "react-redux";

class BottomPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputShape: [
				{
					x: 10,
					y: 10,
					width: 100,
					height: 100,
					//fill: "red",
					id: "circle1"
				},
				{
					x: 20,
					y: 20,
					width: 100,
					height: 100,
					//fill: "red",
					id: "circle2"
				},
				{
					x: 30,
					y: 30,
					width: 100,
					height: 100,
					//fill: "red",
					id: "circle3"
				},
				{
					x: 40,
					y: 40,
					width: 100,
					height: 100,
					//fill: "red",
					id: "circle4"
				}
			],

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

	render() {
		// Stage is a div container
		// Layer is actual canvas element (so you may have several canvases in the stage)
		// And then we have canvas shapes inside the Layer
		let primary = this.props.drawing.primary;
		let secondary = this.props.drawing.secondary;
		return (
			<div>
				<div className="primary-color">
					<Stage
						width={800}
						height={800}
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
							{this.state.inputShape.map((data, id) => {
								console.log(data);
								return (
									<ShapeElement
										key={id}
										url="images/Circle.png"
										shapeProps={data}
										isSelected={
											data.id === this.state.selectedShape
										}
										onSelect={() => {
											console.log(data.id);
											this.setState({
												selectedShape: data.id
											});
										}}
										onChange={newAttrs => {
											const inputs = this.state.inputShape.slice();
											inputs[id] = newAttrs;
											this.setState({
												inputShape: inputs
											});
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

export default connect(mapStateToProps)(BottomPreview);
