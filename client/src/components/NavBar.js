import React from "react";
import ReactDOM from "react-dom";
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
	}

	updateInput(id, event) {
		this.setState({ [id]: event.target.value });
	}

	openRequestModal = e => {
		//this.props.captureImage();
		e.preventDefault();
		this.props.history.push("/request-quote");
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
						name={"Bug Report"}
						onClick={this.openHelpModal}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design
});

export default connect(
	mapStateToProps,
	{ setGridSize, toggleModal }
)(Navbar);
