import React, { Component } from "react";

import LogoSizeSelect from "./LogoSizeSelect";

import { saveLogo } from "../actions/designActions";
import { connect } from "react-redux";

class LogoUpload extends Component {
	constructor(props) {
		super(props);
		//this.state = { file: null };
		this.onChange = this.onChange.bind(this);
		this.resetFile = this.resetFile.bind(this);
	}
	onChange(event) {
		if (event.target.files[0]) {
			this.props.saveLogo(
				URL.createObjectURL(event.target.files[0]),
				this.props.view
			);
		}
	}

	resetFile(event) {
		event.preventDefault();
		//this.setState({ file: null });
		this.props.saveLogo(null, this.props.view);
	}
	render() {
		let data = "";
		if (this.props.view === "side") {
			data = this.props.design.side;
		} else if (this.props.view === "bottom") {
			data = this.props.design.bottom;
		}
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
						<img src={data.logo} alt="sample-img"/>
					</div>
					{data.logo && (
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
					<LogoSizeSelect
						unit="x"
						type="LogoSize"
						data={data}
						view={this.props.view}
					/>
					<label>Logo Rotation</label>
					<LogoSizeSelect
						unit="deg"
						type="rotation"
						data={data}
						view={this.props.view}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(
	mapStateToProps,
	{ saveLogo }
)(LogoUpload);
