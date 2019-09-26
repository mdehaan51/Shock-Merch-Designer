import React, { Component } from "react";

import { saveLogo } from "../actions/designActions";
import { connect } from "react-redux";

class LogoUpload extends Component {
	constructor(props) {
		super(props);
		this.state = { file: null };
		this.onChange = this.onChange.bind(this);
		this.resetFile = this.resetFile.bind(this);
	}
	onChange(event) {
		this.setState({
			file: URL.createObjectURL(event.target.files[0])
		});
		this.props.saveLogo(URL.createObjectURL(event.target.files[0]));
	}

	resetFile(event) {
		event.preventDefault();
		this.setState({ file: null });
		this.props.saveLogo("");
	}
	render() {
		return (
			<div>
				<input type="file" onChange={this.onChange} />
				{this.state.file && (
					<div style={{ textAlign: "center" }}>
						<button onClick={this.resetFile}>Remove File</button>
					</div>
				)}
				<img style={{ maxWidth: "200px" }} src={this.state.file} />
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
