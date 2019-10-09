import React, { Component } from "react";
import ReactDOM from "react-dom";

import ShapeList from "./ShapeList.js";

import { ChromePicker } from "react-color";

import { setShapeColor, addShape } from "../../actions/drawingActions";
import { connect } from "react-redux";

class ShapeSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onChangeCompleteShape = (color, event) => {
		console.log(color);
		this.props.setShapeColor(color);
	};

	addShape = (src, name) => {
		this.props.addShape(src, name);
	};

	render() {
		return (
			<div className="shape-list-container">
				<h4>Select A Shape</h4>
				<div className="shape-list">
					{ShapeList.map((item, id) => {
						return (
							<div key={id} className="shape-list-item">
								<img
									src={item.src}
									onClick={() =>
										this.addShape(item.src, item.name)
									}
								/>
							</div>
						);
					})}
				</div>
				<div className="shape-color-picker">
					<ChromePicker
						color={this.props.drawing.shape.hex}
						onChangeComplete={this.onChangeCompleteShape}
					/>
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
	{ setShapeColor, addShape }
)(ShapeSelector);
