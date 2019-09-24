import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import ColorPicker from "./ColorPicker";
import TextEditor from "./TextEditor";

import { saveColor } from "../actions/designActions";
import { connect } from "react-redux";

import "react-tabs/style/react-tabs.css";
import "../styles/DesignSettings.css";

class DesignSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange = (option, color, event) => {
		this.props.saveColor(color.hex);
	};

	render() {
		return (
			<div className="design-settings-container">
				<Tabs>
					<TabList>
						<Tab>Add Text</Tab>
						<Tab>Change Color</Tab>
						<Tab>Add Logo</Tab>
					</TabList>
					<TabPanel>
						<TextEditor />
					</TabPanel>
					<TabPanel>
						<ColorPicker />
					</TabPanel>
					<TabPanel>
						<h2>Add Logo</h2>
					</TabPanel>
				</Tabs>
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
)(DesignSettings);
