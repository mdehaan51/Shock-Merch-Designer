import React, { Component } from "react";
import ReactDOM from "react-dom";

import FontPicker from "font-picker-react";
import { CirclePicker } from "react-color";

import FontSizeSelect from "./FontSizeSelect";

import { addText, textColor } from "../actions/designActions";
import { connect } from "react-redux";

import "react-tabs/style/react-tabs.css";
import "../styles/DesignSettings.css";

class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFontFamily: "Open Sans",
			sampleText: "Example",
			fontAdded: false
		};
	}

	addFont = () => {
		this.setState({
			fontAdded: true
		});
	};

	changeText = event => {
		this.props.addText("text", event.target.value);
	};

	onColorChange = (color, event) => {
		console.log(color);
		this.props.textColor(color.hex);
	};

	render() {
		return (
			<div className="design-details-container text-editor ">
				<div className="row">
					<div className="text input col s6">
						<label>Enter Your Text Here</label>
						<input
							type="text"
							className="text-editor-input apply-font"
							placeholder=""
							onChange={this.changeText}
						/>
					</div>
					<div className="font-picker col s6">
						<label className=" col s12">Choose Your Font</label>
						<FontPicker
							apiKey="AIzaSyBUSf-r50-odn9JVFU4k4n8nl_fJJ3GBtY"
							activeFontFamily={this.state.activeFontFamily}
							onChange={nextFont =>
								this.setState({
									activeFontFamily: nextFont.family
								})
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col s6">
						<label>Choose Your Text Color</label>
						<CirclePicker onChangeComplete={this.onColorChange} />
					</div>
					<div className="col s6">
						<div className="row">
							<div className="col s6">
								<label>Font Size</label>
								<FontSizeSelect unit="px" type="fontSize" />
							</div>
							<div className="col s6">
								<label>Rotation</label>
								<FontSizeSelect unit="deg" type="rotation" />
							</div>
						</div>
						<div className="row">
							<div className="col s6">
								<label>Weight</label>
								<FontSizeSelect type="weight" />
							</div>
							<div className="col s6">
								<label>Line Height</label>
								<FontSizeSelect unit="px" type="height" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(
	mapStateToProps,
	{ addText, textColor }
)(TextEditor);
