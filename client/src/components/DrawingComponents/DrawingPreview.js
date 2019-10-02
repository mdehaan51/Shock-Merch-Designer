import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Image } from "react-konva";
import Konva from "konva";

import SockImage from "./SockImage";
import { Socks } from "./constants";

import { connect } from "react-redux";

class DrawingPreview extends Component {
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
