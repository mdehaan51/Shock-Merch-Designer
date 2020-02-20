import React, { Component } from "react";
import { connect } from "react-redux";

import TextPreview from "./TextPreview";
import LogoPreview from "./LogoPreview";

import Draggable from "react-draggable";

import "../styles/ProductPreview.css";

class ProductPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let data = "";
		let transform = {};
		if (this.props.view === "side") {
			data = this.props.design.side;
			transform = { transform: "translateX(-58%) rotate(20deg)" };
		} else if (this.props.view === "bottom") {
			data = this.props.design.bottom;
			transform = {
				transform: "translateX(-51%) rotate(0deg)",
				height: "90%",
				width: "263px"
			};
		} else if (this.props.view === "top") {
			data = this.props.design.top;
		}
		return (
			<div className="preview-container">
				<div className="text-boundary-container">
					<div className="text-boundary" style={transform}>
						<Draggable
							bounds="parent"
							defaultPosition={{ x: 0, y: 30 }}
						>
							<div>
								<TextPreview data={data} />
							</div>
						</Draggable>
						<Draggable
							bounds="parent"
							defaultPosition={{ x: 0, y: 30 }}
						>
							<div>
								<LogoPreview data={data} />
							</div>
						</Draggable>
					</div>
				</div>
				<img className="preview-img" src={data.sockPic} alt="preview-img"/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design
});

export default connect(mapStateToProps)(ProductPreview);
