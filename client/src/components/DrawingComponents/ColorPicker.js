import React, { Component } from "react";
import ReactDOM from "react-dom";

import { ChromePicker } from "react-color";
import {
	setPrimarySockColor,
	setSecondarySockColor
} from "../../actions/drawingActions";
import { connect } from "react-redux";

import "react-tabs/style/react-tabs.css";

class ColorSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onChangeCompletePrimary = (color, event) => {
		console.log(color);
		this.props.setPrimarySockColor(color);
	};

	onChangeCompleteSecondary = (color, event) => {
		console.log(color);
		this.props.setSecondarySockColor(color);
	};

	render() {
		return (
			<div>
				Choose Your Sock Colors
				<ChromePicker
					color={this.props.drawing.primary.hex}
					onChangeComplete={this.onChangeCompletePrimary}
				/>
				<ChromePicker
					color={this.props.drawing.secondary.hex}
					onChangeComplete={this.onChangeCompleteSecondary}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing
});

export default connect(
	mapStateToProps,
	{ setPrimarySockColor, setSecondarySockColor }
)(ColorSelect);
