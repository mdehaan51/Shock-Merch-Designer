import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

import ColorSelect from "./ColorPicker";
import TextEditor from "./TextEditor";
import ImageUpload from "./ImageUpload";

import Konva from "konva";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
	setPrimarySockColor,
	setSecondarySockColor
} from "../../actions/drawingActions";
import {
	addText,
	updateText,
	selectText,
	addImage,
	updateImages,
	selectImage,
	copyImage,
	deleteImage
} from "../../actions/sideActions";
import { connect } from "react-redux";

class SideDrawingTools extends Component {
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

	getSelectedItem = (item, type) => {
		if (type == "text") {
			let allItems = this.props.side.text;
			let itemDetails = allItems.filter(obj => {
				return obj.id === item;
			});
			return itemDetails;
		} else if (type == "image") {
			let allItems = this.props.side.images;
			let itemDetails = allItems.filter(obj => {
				return obj.id === item;
			});
			return itemDetails;
		}
	};

	render() {
		let color = this.props.drawing.primary.hex;
		let selectedText = this.getSelectedItem(
			this.props.side.selectedItem,
			"text"
		);
		let selectedImage = this.getSelectedItem(
			this.props.side.selectedItem,
			"image"
		);
		return (
			<Tabs>
				<TabList>
					<Tab>Add Text</Tab>
					<Tab>Change Color</Tab>
					<Tab>Add Image</Tab>
				</TabList>
				<TabPanel>
					<TextEditor
						data={this.props.side.text}
						addText={this.props.addText}
						updateText={this.props.updateText}
						selectedText={selectedText}
						view="side"
					/>
				</TabPanel>
				<TabPanel>
					<ColorSelect />
				</TabPanel>
				<TabPanel>
					<ImageUpload
						saveImage={this.props.addImage}
						selectedImage={selectedImage}
						addImage={this.props.addImage}
						copyImage={this.props.copyImage}
						deleteImage={this.props.deleteImage}
						view="side"
					/>
				</TabPanel>
			</Tabs>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing,
	side: state.side
});

export default connect(
	mapStateToProps,
	{
		setPrimarySockColor,
		setSecondarySockColor,
		addText,
		updateText,
		selectText,
		addImage,
		updateImages,
		selectImage,
		copyImage,
		deleteImage
	}
)(SideDrawingTools);
