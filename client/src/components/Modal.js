import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { quoteRequest } from "../actions/gridActions";
import "../styles/App.css";

const HelpForm = ({ onSubmit, name, email }) => {
	return (
		<form className="modal-form" id="contact-form" onSubmit={onSubmit}>
			<div className="form-row input-field">
				<input
					type="text"
					placeholder="Name"
					id="name"
					value={name}
					disabled
				/>

				<input
					type="text"
					placeholder="Email"
					id="email"
					value={email}
					disabled
				/>
			</div>

			<div className="form-row input-field">
				<textarea
					className="materialize-textarea"
					type="text"
					placeholder="Please describe what happened, and what you expected to happen."
					id="message"
					style={{
						height: "200px"
					}}
				/>
			</div>
			<button className="button hoverable" type="submit">
				Submit
			</button>
		</form>
	);
};

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resonse: "",
			email: "",
			size: "",
			date: ""
		};
	}
	componentDidMount() {}
	handleSubmit = e => {
		e.preventDefault();
		const name = document.getElementById("name").value;
		const business = document.getElementById("business-name").value;
		const email = document.getElementById("email").value;
		const phone = document.getElementById("phone").value;
		const city = document.getElementById("city").value;
		const country = document.getElementById("country").value;
		const message = document.getElementById("message").value;
		const size = this.state.size;
		const date = this.state.date;
		const components = this.props.components;
		const img = this.props.captureImage;
		console.log(img);
		let messageData = {
			name: name,
			business: business,
			email: email,
			phone: phone,
			location: city + " " + country,
			size: size,
			date: date,
			message: message,
			components: components,
			img: img
		};

		axios({
			method: "POST",
			url: "/api/users/save_user",
			data: messageData
		});

		axios({
			method: "POST",
			url: "/api/mailer/send",
			data: messageData
		}).then(response => {
			console.log(response);
			if (response.data.msg === "success") {
				alert("Message Sent.");
				this.resetForm();
			} else if (response.data.msg === "fail") {
				alert("Message failed to send. Please try again later.");
			}
		});
	};

	submitBug = e => {
		e.preventDefault();
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const message = document.getElementById("message").value;
		let messageData = {
			name: name,
			email: email,
			message: message
		};
		axios({
			method: "POST",
			url: "/api/mailer/bug",
			data: messageData
		}).then(response => {
			console.log(response);
			if (response.data.msg === "success") {
				alert("Thank you! Our tech team will review!");
				this.resetForm();
			} else if (response.data.msg === "fail") {
				alert("Message failed to send.");
			}
		});
	};

	resetForm() {
		document.getElementById("contact-form").reset();
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		let showHideClassName = this.props.show
			? "modal display-block"
			: "modal display-none";
		let form;

		/*if (this.props.type === "request") {
			form = (
				<RequestForm
					onSubmit={this.handleSubmit.bind(this)}
					size={this.state.size}
					date={this.state.date}
					onChange={this.onChange.bind(this)}
					email={this.props.email}
					name={this.props.name}
				/>
			);
		} else if (this.props.type === "help") {*/
		form = (
			<HelpForm
				onSubmit={this.submitBug.bind(this)}
				email={this.props.email}
				name={this.props.name}
			/>
		);

		return (
			<div className={showHideClassName} ref={this.props.reference}>
				<section className="modal-main">
					<img
						alt=""
						className="close-modal"
						src="images/close.png"
						onClick={this.props.handleClose}
					/>
					<img alt="" className="modal-background-dimmer" />
					<h2>{this.props.title}</h2>
					{form}
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ quoteRequest }
)(Modal);
