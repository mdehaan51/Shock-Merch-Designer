import React, { Component } from "react";
import ReactDOM from "react-dom";

import FontPicker from "font-picker-react";

import { ChromePicker } from "react-color";

import { updateSideText, addText } from "../../actions/drawingActions";
import { connect } from "react-redux";

class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontFamily: "Open Sans",
			sampleText: "Example",
			fontAdded: false,
			style: {
				fontFamily: "Anton",
				fontSize: 20,
				//fontWeight: 200,
				//lineHeight: 20,
				fill: "#ffffff"
			},
			activated: false
		};
	}
	compondentWillUpdate() {
		console.log("here");
		console.log(this.props.drawing.selectedText);
		if (this.props.drawing.selectedText !== "") {
			this.setState({
				activated: true
			});
		}
	}

	addFont = () => {
		this.setState({
			fontAdded: true
		});
	};

	addText = () => {
		console.log("text-added");
		this.props.addText("Insert Text", this.state.style);
	};

	/*addText = event => {
		this.props.previewText(event.target.value, this.state.style);
	};*/
	updateText = (e, newAttrs) => {
		console.log(newAttrs);
		//const inputs = this.props.drawing.sideText.slice();
		//inputs[id] = newAttrs;
		//this.props.updateSideText(inputs);
	};

	render() {
		let selectedText = this.props.drawing.selectedText["0"];
		/*selectedText
			? this.setState({
					activated: true
			  })
			: this.setState({
					activated: false
			  });*/
		return (
			<div className="design-details-container text-editor ">
				<div className="row">
					<button
						className="add-text-button button hoverable col offset-s1"
						onClick={this.addText}
					>
						Add New Text
					</button>
				</div>
				<div className="row">
					<div className="text input col s6">
						<label>Enter Your Text Here</label>
						<input
							type="text"
							className="text-editor-input apply-font"
							placeholder={
								/*selectedText.text  ? selectedText.text :*/ ""
							}
							onChange={this.updateText()}
						/>
					</div>
					<div className="font-picker col s6">
						<label className=" col s12">Choose Your Font</label>
						<FontPicker
							apiKey="AIzaSyBUSf-r50-odn9JVFU4k4n8nl_fJJ3GBtY"
							activeFontFamily={this.state.style.fontFamily}
							onChange={nextFont =>
								this.setState({
									style: {
										...this.state.style,
										fontFamily: nextFont.family
									}
								})
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col s6">
						<label>Choose Your Text Color</label>
						<ChromePicker onChangeComplete={this.onColorChange} />
					</div>
					<div className="col s6">
						<div className="row">
							<div className="col s6">
								<label>Font Size</label>
								{/*<FontSizeSelect
									unit="px"
									type="fontSize"
									data={data}
									view={this.props.view}
								/>*/}
							</div>
							<div className="col s6">
								<label>Rotation</label>
								{/*<FontSizeSelect
									unit="deg"
									type="rotation"
									data={data}
									view={this.props.view}
								/>*/}
							</div>
						</div>
						<div className="row">
							<div className="col s6">
								<label>Weight</label>
								{/*<FontSizeSelect
									type="weight"
									data={data}
									view={this.props.view}
								/>*/}
							</div>
							<div className="col s6">
								<label>Line Height</label>
								{/*<FontSizeSelect
									unit="px"
									type="height"
									data={data}
									view={this.props.view}
								/>*/}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing
});

export default connect(
	mapStateToProps,
	{ updateSideText, addText }
)(TextEditor);
