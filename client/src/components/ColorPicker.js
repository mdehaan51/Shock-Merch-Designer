import React, { Component } from "react";
import ReactDOM from "react-dom";

import { CirclePicker } from "react-color";

import { saveColor } from "../actions/designActions";
import { connect } from "react-redux";

import "react-tabs/style/react-tabs.css";
import "../styles/DesignSettings.css";

class ColorPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange = (color, event, name) => {
		console.log(name);
		this.props.saveColor(name, color.hex);
	};

	render() {
		return (
			<div className="color-picker-container">
				<h3>Primary Color</h3>
				<CirclePicker
					label="primary"
					onChangeComplete={(color, event, name) =>
						this.handleChange(color, event, "primary")
					}
				/>
				<h3>Secondary Color</h3>
				<CirclePicker
					onChangeComplete={(color, event, name) =>
						this.handleChange(color, event, "secondary")
					}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(
	mapStateToProps,
	{ saveColor }
)(ColorPicker);
