import React, { Component } from "react";

import ShapeList from "./ShapeList.js";

import { ChromePicker } from "react-color";

import { setShapeColor, addShape } from "../../actions/bottomActions";

import { saveData, savePreview } from "../../actions/drawingActions";

import { connect } from "react-redux";

class ShapeSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null
		};
	}

	onChangeCompleteShape = (color, event) => {
		console.log(color);
		this.props.setShapeColor(color);
	};

	addShape = (src, name) => {
		this.props.addShape(src, name, "bottom");
	};

	onUpload = e => {
		let image = URL.createObjectURL(e.target.files[0]);
		this.setState({
			img: image
		});

		this.props.savePreview(image);
	};

	resetFile = e => {
		e.preventDefault();
		this.setState({ img: null });
		this.props.savePreview(null);
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
									alt='shape-item'
								/>
							</div>
						);
					})}
				</div>
				<div className="shape-color-picker">
					<ChromePicker
						color={this.props.bottom.shape.hex}
						onChangeComplete={this.onChangeCompleteShape}
					/>
				</div>
				<div className="grip-img-upload">
					<h5>Already have a grip design?</h5>
					<label>Upload it here</label>

					<input
						className="image-upload-input "
						type="file"
						onChange={this.onUpload}
						placeholder="Awaiting Upload"
					/>
					<img src={this.props.drawing.preview} alt='drawing-preview'/>

					{this.props.drawing.preview && (
						<button
							className="remove-logo button hoverable"
							onClick={this.resetFile}
						>
							Remove Image
						</button>
					)}
					<p>
						If you already have a design that you use or simply dont
						want to use our tool, please upload a sample design
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	drawing: state.drawing,
	bottom: state.bottom
});

export default connect(
	mapStateToProps,
	{ setShapeColor, addShape, saveData, savePreview }
)(ShapeSelector);
