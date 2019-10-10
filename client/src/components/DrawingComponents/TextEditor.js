import React, { Component } from "react";
import ReactDOM from "react-dom";

import FontPicker from "font-picker-react";

import ItemDetailSelector from "./ItemDetailSelector";

import { ChromePicker } from "react-color";

import { connect } from "react-redux";

class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "Insert Text",
			fontAdded: false,
			style: {
				fontFamily: "Anton",
				fontSize: 20,
				fill: "#ffffff",
				stroke: ""
			},
			activated: false
		};
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

	updateState = (key, value) => {
		this.setState(
			{
				[key]: value
			},
			() => this.updateText()
		);
	};
	findTextDetails = () => {};

	updateText = e => {
		let style = this.state.style;
		let text = this.state.text;
		let id = this.props.selectedText[0].id;
		let data = this.props.data;

		let index = data.findIndex(obj => obj.id === id);
		let item = data.splice(index, 1);
		console.log(item);
		item[0] = {
			...item[0],
			text: text,
			style
		};
		data.push(item[0]);

		this.props.updateText(data);
	};

	render() {
		let selectedText = this.props.selectedText[0];
		//if (!selectedText) return null;
		console.log(selectedText);
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
					<p>Or Select Existing Text to Edit</p>
				</div>
				{!selectedText ? null : (
					<React.Fragment>
						<div className="row">
							<div className="text input col s6">
								<label>Enter Your Text Here</label>
								<input
									type="text"
									className="text-editor-input apply-font"
									defaultValue={selectedText.text}
									onChange={e =>
										this.setState(
											{
												text: e.target.value
											},
											() => this.updateText()
										)
									}
								/>
							</div>
							<div className="font-picker col s6">
								<label className=" col s12">
									Choose Your Font
								</label>
								<FontPicker
									apiKey="AIzaSyBUSf-r50-odn9JVFU4k4n8nl_fJJ3GBtY"
									activeFontFamily={
										this.state.style.fontFamily
									}
									onChange={nextFont =>
										this.setState(
											{
												style: {
													...this.state.style,
													fontFamily: nextFont.family
												}
											},
											() => this.updateText()
										)
									}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col s6">
								<label>Choose Your Text Color</label>
								<ChromePicker
									color={this.state.style.fill}
									onChangeComplete={color =>
										this.setState(
											{
												style: {
													...this.state.style,
													fill: color.hex
												}
											},
											() => this.updateText()
										)
									}
								/>
							</div>
							<div className="col s6">
								<label>Choose Your Text Outline Color</label>
								<ChromePicker
									color={this.state.style.stroke}
									onChangeComplete={color =>
										this.setState(
											{
												style: {
													...this.state.style,
													stroke: color.hex
												}
											},
											() => this.updateText()
										)
									}
								/>
								<a
									style={{ cursor: "pointer" }}
									onClick={e =>
										this.setState(
											{
												style: {
													...this.state.style,
													stroke: ""
												}
											},
											() => this.updateText()
										)
									}
								>
									Clear Outline
								</a>
							</div>
						</div>
						<div className="row">
							<div className="col s6">
								<div className="row">
									<div className="col s6">
										<label>Font Size</label>
										<input
											type="number"
											className="text-editor-input"
											placeholder={
												selectedText.style.fontSize
											}
											onChange={e =>
												this.setState(
													{
														style: {
															...this.state.style,
															fontSize:
																e.target.value
														}
													},
													() => this.updateText()
												)
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing,
	side: state.side,
	bottom: state.bottom,
	top: state.top
});

export default connect(mapStateToProps)(TextEditor);
