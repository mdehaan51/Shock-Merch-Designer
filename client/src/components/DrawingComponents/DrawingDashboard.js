import React, { Component } from "react";

//Component Imports
import Modal from "../Modal.js";

import Navbar from "../NavBar.js";
import BottomPreview from "./BottomPreview";
import SidePreview from "./SidePreview";
import TopPreview from "./TopPreview";
import SideDrawingTools from "./SideDrawingTools";
import BottomDrawingTools from "./BottomDrawingTools";
import TopDrawingTools from "./TopDrawingTools";



//Redux Imports
import { logoutUser } from "../../actions/authActions";
import { toggleModal } from "../../actions/gridActions";
import { setSock } from "../../actions/drawingActions";
import { connect } from "react-redux";

//style imports
import "../../styles/App.css";
import "../../styles/DesignLayout.css";
import "../../styles/DesignSettings.css";
import "../../styles/DrawingDashboard.css";

class DesignLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "crew",
			counter: 0
		};
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
	changeSock = e => {
		this.setState({
			value: e.target.value
		});
		this.props.setSock(e.target.value);
	};

	nextPage = () => {
		let counter = this.state.counter;
		if (counter < 2) {
			this.setState({
				counter: counter + 1
			});
		} else {
			this.props.history.push("/request-quote");
		}
	};

	lastPage = () => {
		let counter = this.state.counter;
		this.setState({
			counter: counter - 1
		});
	};

	render() {

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
						{this.state.counter === 0 ? (
							<React.Fragment>
								<div className="navigation-bar">
									<div className="select-sock">
										<select
											value={this.state.value}
											onChange={this.changeSock}
										>
											<option defaultValue value="crew">
												Crew
											</option>
											<option value="ankle">Ankle</option>
										</select>
									</div>

									<button
										className="button hoverable"
										onClick={this.nextPage}
									>
										Next
									</button>
								</div>
								<div className="col s12 m12 l6 xl6">
									<SidePreview />
								</div>
								<div className="col s12 m12 l6 xl6">
									<SideDrawingTools />
								</div>
							</React.Fragment>
						) : this.state.counter === 1 ? (
							<React.Fragment>
								<div className="navigation-bar">
									<button
										className="button hoverable"
										onClick={this.lastPage}
									>
										Go back
									</button>

									<button
										className="button hoverable"
										onClick={this.nextPage}
									>
										Next
									</button>
								</div>
								<div className="col s12 m12 l6 xl6">
									<BottomPreview />
								</div>
								<div className="col s12 m12 l6 xl6">
									<BottomDrawingTools />
								</div>
							</React.Fragment>
						) : this.state.counter === 2 ? (
							<React.Fragment>
								<div className="navigation-bar">
									<button
										className="button hoverable"
										onClick={this.lastPage}
									>
										Go back
									</button>

									<button
										className="button hoverable"
										onClick={this.nextPage}
									>
										Request Quote
									</button>
								</div>
								<div className="col s12 m12 l6 xl6">
									<TopPreview />
								</div>
								<div className="col s12 m12 l6 xl6">
									<TopDrawingTools />
								</div>
							</React.Fragment>
						) : null}
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
	{ logoutUser, toggleModal, setSock }
)(DesignLayout);
