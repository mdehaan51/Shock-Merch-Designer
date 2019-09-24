import React, { Component } from "react";
import ReactDOM from "react-dom";

import FontPicker from "font-picker-react";

import { addText } from "../actions/designActions";
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
		this.props.addText(this.state.sampleText);
	};

	changeText = event => {
		this.setState({
			sampleText: event.target.value
		});
	};

	render() {
		return (
			<div className="design-details-container ">
				<h3> Add Some Text</h3>
				<div className="row">
					<input
						type="text"
						className="text-editor-input apply-font"
						placeholder="Enter Your Text Here"
						onChange={this.changeText}
					/>
				</div>
				<div className="row">
					<h5>Choose Your Font</h5>
					<FontPicker
						apiKey="AIzaSyBUSf-r50-odn9JVFU4k4n8nl_fJJ3GBtY"
						activeFontFamily={this.state.activeFontFamily}
					/>
				</div>
				{!this.state.fontAdded ? (
					<button className="button hoverable" onClick={this.addFont}>
						Add Text
					</button>
				) : (
					<div> this is a test</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(
	mapStateToProps,
	{ addText }
)(TextEditor);
