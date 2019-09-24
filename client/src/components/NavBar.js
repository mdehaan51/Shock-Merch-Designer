import React from "react";
import { NavButton, NavInput } from "./constants.js";
import { connect } from "react-redux";
import { setGridSize, toggleModal } from "../actions/gridActions";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: "",
			width: ""
		};
		this.updateInput = this.updateInput.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	updateInput(id, event) {
		this.setState({ [id]: event.target.value });
	}

	onSubmit = e => {
		e.preventDefault();
		if (this.state.height > 0 && this.state.width > 0) {
			const dimensions = {
				height: this.state.height,
				width: this.state.width
			};
			this.props.setGridSize(dimensions);
		} else {
			alert("Please Input A Value Before Submitting");
		}
	};

	openRequestModal = e => {
		//this.props.captureImage();
		e.preventDefault();
		const modal = {
			active: true,
			type: "request",
			title: "Lets Get This Park Started!"
		};
		this.props.toggleModal(modal);
	};

	openHelpModal = e => {
		e.preventDefault();
		const modal = {
			active: true,
			type: "help",
			title: "Report Bug"
		};
		this.props.toggleModal(modal);
	};

	render() {
		return (
			<div className="navbar">
				<div className="company-icon">
					<img alt="" src="images/shocklogov2.png" />
				</div>
				<div className="size-input input-field form-row" />
				<div className="submission-buttons">
					<NavButton
						name={"Request Quote"}
						onClick={this.openRequestModal}
					/>
					<NavButton
						name={"Bug Report"}
						onClick={this.openHelpModal}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	width: state.width,
	height: state.height
});

export default connect(
	mapStateToProps,
	{ setGridSize, toggleModal }
)(Navbar);
