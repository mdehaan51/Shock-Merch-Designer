import React, { Component } from "react";
import ReactDOM from "react-dom";

import FontPicker from "font-picker-react";

import { connect } from "react-redux";

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
		this.props.addText("text", event.target.value, this.props.view);
	};

	render() {
		/*let text = this.props.data.font;
		let size = this.props.data.fontSize;
		let rotation = this.props.data.fontRotation;
		let weight = this.props.data.fontWeight;
		let lineHeight = this.props.data.lineHeight;
		let color = this.props.data.textColor;

		let sampleText = {
			fontSize: `${size}px`,
			fontWeight: weight,
			transform: `rotate(${rotation}deg)`,
			lineHeight: `${lineHeight}px`,
			color: color
		};*/
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
			</div>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing
});

export default connect(mapStateToProps)(TextEditor);
