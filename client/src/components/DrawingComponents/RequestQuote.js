import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//Component Imports
import Modal from "../Modal.js";
import ProductPreview from "../ProductPreview";

import DesignSettings from "../DesignSettings";
import Navbar from "../NavBar.js";
import BottomPreview from "./BottomPreview";
import SidePreview from "./SidePreview";
import TopPreview from "./TopPreview";
import SideDrawingTools from "./SideDrawingTools";
import BottomDrawingTools from "./BottomDrawingTools";
import TopDrawingTools from "./TopDrawingTools";
import RequestForm from "./RequestQuoteForm";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//Redux Imports
import { logoutUser } from "../../actions/authActions";
import { toggleModal } from "../../actions/gridActions";
import { connect } from "react-redux";

//style imports
import "../../styles/App.css";
import "../../styles/DesignLayout.css";

import "../../styles/DrawingDashboard.css";

class DesignLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		/*window.onbeforeunload = e => {
			console.log("Stop this");
			e.preventDefault();
			e.returnValue = "";
		};*/
	}

	componentDidUpdate(prevProps, prevState) {}

	goBack = e => {
		e.preventDefault();
		this.props.history.push("/dashboard");
	};

	hideModal = e => {
		e.preventDefault();
		const modal = {
			active: false,
			type: "",
			title: ""
		};
		this.props.toggleModal(modal);
	};

	render() {
		let size = {
			width: this.state.gridWidth,
			height: this.state.gridHeight,
			backgroundSize: this.state.gridSize
		};

		return (
			<div>
				<Navbar
					setSize={this.setSize}
					request={this.showRequestModal}
					help={this.showHelpModal}
					captureImage={this.captureImage}
				/>
				<Modal
					show={this.props.design.modal.active}
					handleClose={this.hideModal}
					title={this.props.design.modal.title}
					type={this.props.design.modal.type}
					components={this.state.counterList}
					captureImage={this.state.imgData}
					name={this.props.auth.user.name}
					email={this.props.auth.user.email}
				/>
				<div className="builder-container">
					<img
						alt=""
						className="container-background"
						src="images/background.jpg"
					/>
					<a onClick={this.goBack} className="logout-button " href="">
						Go Back
					</a>
					<div className="row request-body">
						<div className="col s12">
							<h2>Request a Quote</h2>
						</div>
						<div className="col s12 m12 l12 xl6">
							<h5>Give Us Some Details</h5>
							<RequestForm />
						</div>

						<div className="col s12 m12 l12 xl6">
							<div className="row request-images">
								<div className="image-container col s12 m6 l4 xl6">
									<h5>Side View</h5>
									<img
										src={
											this.props.drawing.sideData === null
												? "images/not-created.png"
												: this.props.drawing.sideData
										}
										alt="Side Image"
									/>
								</div>

								<div className="image-container col s12 m6 l4 xl6">
									<h5>Bottom View</h5>
									<img
										src={
											this.props.drawing.preview === null
												? this.props.drawing
														.bottomData === null
													? "images/not-created.png"
													: this.props.drawing
															.bottomData
												: this.props.drawing.preview
										}
										alt="Bottom Image"
									/>
								</div>
								<div className="image-container col s12 m6 l4 xl6">
									<h5>Top View</h5>

									<img
										src={
											this.props.drawing.topData === null
												? "images/not-created.png"
												: this.props.drawing.topData
										}
										alt="Top Image"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design,
	drawing: state.drawing
});

export default connect(
	mapStateToProps,
	{ logoutUser, toggleModal }
)(DesignLayout);
