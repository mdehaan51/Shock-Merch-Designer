import React, { Component } from "react";

import TextEditor from "./TextEditor";
import ShapeSelector from "./ShapeSelector";
import ImageUpload from "./ImageUpload";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
	setPrimarySockColor,
	setSecondarySockColor
} from "../../actions/drawingActions";
import {
	setShapeColor,
	addShape,
	updateShapes,
	addText,
	updateText,
	selectText,
	addImage,
	updateImages,
	selectImage,
	copyImage,
	deleteImage
} from "../../actions/bottomActions";
import { connect } from "react-redux";

class BottomDrawingTools extends Component {
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
		if (type === "text") {
			let allItems = this.props.bottom.text;
			let itemDetails = allItems.filter(obj => {
				return obj.id === item;
			});
			return itemDetails;
		} else if (type === "image") {
			let allItems = this.props.bottom.images;
			let itemDetails = allItems.filter(obj => {
				return obj.id === item;
			});
			return itemDetails;
		}
	};

	render() {
		let selectedText = this.getSelectedItem(
			this.props.bottom.selectedItem,
			"text"
		);
		let selectedImage = this.getSelectedItem(
			this.props.bottom.selectedItem,
			"image"
		);
		return (
			<Tabs>
				<TabList>
					<Tab style={{ width: "25%" }}>Add Text</Tab>

					<Tab style={{ width: "25%" }}>Add Grip Pads</Tab>
					<Tab style={{ width: "25%" }}>Add Logo</Tab>
				</TabList>
				<TabPanel>
					<TextEditor
						data={this.props.bottom.text}
						addText={this.props.addText}
						updateText={this.props.updateText}
						selectedText={selectedText}
						view="bottom"
					/>
				</TabPanel>

				<TabPanel>
					<ShapeSelector />
				</TabPanel>
				<TabPanel>
					<ImageUpload
						saveImage={this.props.addImage}
						selectedImage={selectedImage}
						addImage={this.props.addImage}
						copyImage={this.props.copyImage}
						deleteImage={this.props.deleteImage}
						view="bottom"
					/>
				</TabPanel>
			</Tabs>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing,
	bottom: state.bottom
});

export default connect(
	mapStateToProps,
	{
		setPrimarySockColor,
		setSecondarySockColor,
		setShapeColor,
		addShape,
		updateShapes,
		addText,
		updateText,
		selectText,
		addImage,
		updateImages,
		selectImage,
		copyImage,
		deleteImage
	}
)(BottomDrawingTools);
