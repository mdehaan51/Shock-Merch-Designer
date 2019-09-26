import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/ProductPreview.css";

class TextPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let text = this.props.design.font;
		let size = this.props.design.fontSize;
		let rotation = this.props.design.fontRotation;
		let weight = this.props.design.fontWeight;
		let lineHeight = this.props.design.lineHeight;
		let color = this.props.design.textColor;

		let sampleText = {
			fontSize: `${size}px`,
			fontWeight: weight,
			transform: `rotate(${rotation}deg)`,
			lineHeight: `${lineHeight}px`,
			color: color
		};
		return (
			<div className="text-preview-container grabable" style={sampleText}>
				<p className="apply-font">{text}</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(mapStateToProps)(TextPreview);
