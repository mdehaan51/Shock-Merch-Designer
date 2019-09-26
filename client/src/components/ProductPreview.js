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
		return (
			<div className="preview-container">
				<div className="text-boundary">
					<Draggable
						bounds="parent"
						defaultPosition={{ x: 0, y: 30 }}
					>
						<div>
							<TextPreview />
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
				<img className="preview-img" src="images/GreenSocks.png" />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design
});

export default connect(mapStateToProps)(ProductPreview);
