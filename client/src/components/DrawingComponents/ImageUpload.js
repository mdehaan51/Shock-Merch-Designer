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
			this.props.saveImage(URL.createObjectURL(event.target.files[0]));
		}
	}

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
