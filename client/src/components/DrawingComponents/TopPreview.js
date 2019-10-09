import React, { Component } from "react";
import { render } from "react-dom";
import Portal from "./Portal";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";

import SockImage2 from "./SockImage2";
import { Socks } from "./constants";
import SquareElement from "./TextElement";

import { connect } from "react-redux";

class TopPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

							{/*this.state.inputList.map((data, id) => {
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
							})*/}
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

export default connect(mapStateToProps)(TopPreview);

