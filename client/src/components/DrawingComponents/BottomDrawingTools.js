import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

import ColorSelect from "./ColorPicker";
import TextEditor from "./TextEditor";
import ShapeSelector from "./ShapeSelector";
import ImageUpload from "./ImageUpload";

import Konva from "konva";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
	setPrimarySockColor,
	setSecondarySockColor
} from "../../actions/drawingActions";
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

	render() {
		let color = this.props.drawing.primary.hex;
		return (
			<Tabs>
				<TabList>
					<Tab style={{ width: "25%" }}>Add Text</Tab>
					<Tab style={{ width: "25%" }}>Change Color</Tab>
					<Tab style={{ width: "25%" }}>Add Shapes</Tab>
					<Tab style={{ width: "25%" }}>Add Logo</Tab>
				</TabList>
				<TabPanel>
					<TextEditor />
				</TabPanel>
				<TabPanel>
					<ColorSelect />
				</TabPanel>
				<TabPanel>
					<ShapeSelector />
				</TabPanel>
				<TabPanel>
					Image
					<ImageUpload />
				</TabPanel>
			</Tabs>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing
});

export default connect(
	mapStateToProps,
	{ setPrimarySockColor, setSecondarySockColor }
)(BottomDrawingTools);
