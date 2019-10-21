import React, { Component } from "react";

//import LogoSizeSelect from "./LogoSizeSelect";

import { addImage } from "../../actions/sideActions";
import { connect } from "react-redux";

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = { file: null, image: "" };
		this.onChange = this.onChange.bind(this);
		this.resetFile = this.resetFile.bind(this);
	}

	componentDidUpdate(prevProps) {}

	onChange(event) {
		if (event.target.files[0]) {
			console.log(event.target.files[0]);
			this.props.saveImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	copyImage = () => {
		let id = this.props.selectedImage[0].id;
		let objects;
		switch (this.props.view) {
			case "side":
				objects = this.props.side.images.find(function(obj) {
					return obj.id === id;
				});
				break;
			case "bottom":
				objects = this.props.bottom.images.find(function(obj) {
					return obj.id === id;
				});
				break;
			case "top":
				objects = this.props.top.images.find(function(obj) {
					return obj.id === id;
				});
				break;
			default:
				break;
		}
		this.props.copyImage(objects);
	};

	deleteImage = () => {
		let id = this.props.bottom.selectedItem;
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
				break;
		}

		this.props.saveImage(objects);
	};

	resetFile(event) {
		event.preventDefault();
		//this.setState({ file: null });
		this.props.saveImage(null, this.props.view);
	}
	render() {
		//let data = this.props.drawing.sideImages[0];
		return (
			<div className="logo-upload-container">
				<div className="row">
					<div className="col s5">
						<label>Add New Image</label>

						<input
							className="image-upload-input "
							type="file"
							onChange={this.onChange}
							placeholder="Awaiting Upload"
						/>

						{this.state.image && (
							<button
								className="remove-logo button hoverable"
								onClick={this.resetFile}
							>
								Remove Image
							</button>
						)}
					</div>
					<p>Or Select Existing Image to Edit</p>
				</div>
				<div className="row">
					<div className="col s6">
						<button
							className="delete-text-button button hoverable"
							onClick={this.copyImage}
						>
							Copy Image
						</button>
					</div>
					<div className="col s6">
						<button
							className="delete-text-button button hoverable"
							onClick={this.deleteImage}
						>
							Delete Image
						</button>
					</div>
				</div>
				<div className="row">
					<p>For best results please do the following:</p>
					<p>1) Only upload PNG, JPG, or AI files</p>
					<p>2) Ensure your logo has a transparent background</p>
					<p>3) Ensure uploaded logo is at least 150 dpi</p>
				</div>
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

export default connect(
	mapStateToProps,
	{ addImage }
)(ImageUpload);
