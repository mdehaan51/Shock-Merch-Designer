import React, { Component } from "react";
import { render } from "react-dom";
import Portal from "./Portal";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";
import { Socks } from "./constants";
import SquareElement from "./TextElement";

import { connect } from "react-redux";

class DrawingPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputList: [
				{
					x: 10,
					y: 10,
					width: 100,
					height: 100,
					fill: "red",
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
		return (
			<div>
				<div className="primary-color">
					<Stage width={800} height={800}>
						<Layer>
							{/*<Portal>*/}
							{this.state.inputList.map((data, id) => {
								console.log(data);
								return (
									<SquareElement
										key={id}
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
											const inputs = this.state.inputList.slice();
											inputs[id] = newAttrs;
											this.setState({
												inputList: inputs
											});
										}}
									/>
								);
							})}

							{/*<Portal>*/}

							<SockImage
								blue={primary.blue}
								red={primary.red}
								green={primary.green}
								src="images/WhiteSocks.png"
							/>
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

export default connect(mapStateToProps)(DrawingPreview);
