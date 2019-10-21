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
			activated: false,
			selectedText: {}
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedText !== this.props.selectedText) {
			try {
				console.log(this.props.selectedText[0].id);
				let id = this.props.selectedText[0].id;
				this.getSelectedText(id);
			} catch (error) {
				console.log(error);
				console.log("id does not exist yet");
			}
		}
	}

	getSelectedText = id => {
		let selectedItem;
		switch (this.props.view) {
			case "side":
				selectedItem = this.props.side.text.find(
					item => item.id === id
				);
				break;
			case "bottom":
				selectedItem = this.props.bottom.text.find(
					item => item.id === id
				);
				break;
			case "top":
				selectedItem = this.props.top.text.find(item => item.id === id);
				break;
			default:
				console.log("not yet");
		}
		this.setState({
			selectedText: selectedItem,
			text: selectedItem.text,
			style: selectedItem.style
		});
	};

	addFont = () => {
		this.setState({
			fontAdded: true
		});
	};

	addText = () => {
		console.log("text-added");
		this.props.addText("Insert Text", this.state.style);
	};

	deleteText = () => {
		let id = this.state.selectedText.id;
		let objects;
		switch (this.props.view) {
			case "side":
				objects = this.props.side.text.filter(function(obj) {
					return obj.id !== id;
				});
				break;
			case "bottom":
				objects = this.props.bottom.text.filter(function(obj) {
					return obj.id !== id;
				});
				break;
			case "top":
				objects = this.props.top.text.filter(function(obj) {
					return obj.id !== id;
				});
				break;
			default:
				console.log("not yet");
		}

		console.log(objects);
		this.props.updateText(objects);
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
		let id = this.state.selectedText.id;
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
		//let selectedText = this.props.selectedText[0];
		//if (!selectedText) return null;
		//console.log(selectedText);
		console.log(this.state.selectedText);
		let selectedText = this.state.selectedText;
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
					<div className="col s6">
						<button
							className="add-text-button button hoverable"
							onClick={this.addText}
						>
							Add New Text
						</button>
					</div>
					<div className="col s6">
						Or Select Existing Text to Edit
					</div>
				</div>
				{Object.keys(selectedText).length === 0 ? null : (
					<React.Fragment>
						<div className="row">
							<div className="text input col s6">
								<label>Enter Your Text Here</label>
								<input
									type="text"
									className="text-editor-input apply-font"
									value={this.state.text}
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
									color={this.state.selectedText.style.fill}
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
									color={this.state.selectedText.style.stroke}
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
								<label>Font Size</label>
								<input
									type="number"
									className="text-editor-input"
									value={this.state.style.fontSize}
									onChange={e =>
										this.setState(
											{
												style: {
													...this.state.style,
													fontSize: e.target.value
												}
											},
											() => this.updateText()
										)
									}
								/>
							</div>
							<div className="col s6">
								<button
									className="delete-text-button button hoverable"
									onClick={this.deleteText}
								>
									Delete Text
								</button>
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
