import React, { Component } from "react";

//import LogoSizeSelect from "./LogoSizeSelect";

import { saveImage } from "../../actions/drawingActions";
import { connect } from "react-redux";

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = { file: null, image: "" };
		this.onChange = this.onChange.bind(this);
		this.resetFile = this.resetFile.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({
				image: this.props.drawing.sideImages[0].image
			});
		}
	}
	onChange(event) {
		if (event.target.files[0]) {
			this.props.saveImage(URL.createObjectURL(event.target.files[0]));
		}
	}

	resetFile(event) {
		event.preventDefault();
		//this.setState({ file: null });
		this.props.saveImage(null, this.props.view);
	}
	render() {
		let data = this.props.drawing.sideImages[0];
		return (
			<div className="logo-upload-container row">
				<div className="col s5 offset-s2">
					<label>Upload A File</label>

					<input
						className="image-upload-input"
						type="file"
						onChange={this.onChange}
						placeholder="Awaiting Upload"
					/>

					<div className="sample-image-container">
						<img src={this.state.image} />
					</div>
					{this.state.image && (
						<button
							className="remove-logo button hoverable"
							onClick={this.resetFile}
						>
							Remove File
						</button>
					)}
				</div>

				<div className="col s5">
					<label>Logo Size</label>
					{/*<LogoSizeSelect
						unit="x"
						type="LogoSize"
						data={data}
						view={this.props.view}
					/>*/}
					<label>Logo Rotation</label>
					{/*<LogoSizeSelect
						unit="deg"
						type="rotation"
						data={data}
						view={this.props.view}
					/>*/}
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
	{ saveImage }
)(ImageUpload);
