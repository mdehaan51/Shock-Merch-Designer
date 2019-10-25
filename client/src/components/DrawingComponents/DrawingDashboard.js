import React, { Component } from "react";
import ReactDOM from "react-dom";

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
		window.onbeforeunload = e => {
			console.log("Stop this");
			e.preventDefault();
			e.returnValue = "";
		};
	}

	componentDidUpdate(prevProps, prevState) {}

	onLogoutClick = e => {
		e.preventDefault();
		this.props.history.push("/");
		this.props.logoutUser(this.props.history);
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
					history={this.props.history}
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
					<a
						onClick={this.onLogoutClick}
						className="logout-button "
						href=""
					>
						Logout
					</a>
					<div className="row design-body">
						<Tabs>
							<TabList className="main-tabs">
								<Tab>Side of Sock</Tab>
								<Tab>Bottom Of Sock</Tab>
								<Tab>Top Of Sock</Tab>
							</TabList>
							<TabPanel>
								<div className="col s12 m12 l6 xl6">
									<SidePreview />
								</div>
								<div className="col s12 m12 l6 xl6">
									<SideDrawingTools />
								</div>
							</TabPanel>
							<TabPanel>
								<div className="col s12 m12 l6 xl6">
									<BottomPreview />
								</div>
								<div className="col s12 m12 l6 xl6">
									<BottomDrawingTools />
								</div>
							</TabPanel>
							<TabPanel>
								<div className="col s12 m12 l6 xl6">
									<TopPreview />
								</div>
								<div className="col s12 m12 l6 xl6">
									<TopDrawingTools />
								</div>
							</TabPanel>
						</Tabs>
					</div>
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
	{ logoutUser, toggleModal }
)(DesignLayout);
