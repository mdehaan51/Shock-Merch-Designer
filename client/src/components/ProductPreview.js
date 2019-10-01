import React, { Component } from "react";
import { connect } from "react-redux";

import TextPreview from "./TextPreview";
import LogoPreview from "./LogoPreview";

import Draggable, { DraggableCore } from "react-draggable";

import "../styles/ProductPreview.css";

class ProductPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let data = "";
		if (this.props.view === "side") {
			data = this.props.design.side;
		} else if (this.props.view === "bottom") {
			data = this.props.design.bottom;
		}
		return (
			<div className="preview-container">
				<div className="text-boundary">
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
							<LogoPreview />
						</div>
					</Draggable>
				</div>
				<img className="preview-img" src={data.sockPic} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design
});

export default connect(mapStateToProps)(ProductPreview);
