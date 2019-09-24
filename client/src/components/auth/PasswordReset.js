import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import classnames from "classnames";
import { AuthText, AuthTopBar } from "../constants.js";

class PasswordReset extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			password2: "",
			authToken: "",
			errors: {}
		};
	}

	async componentDidMount() {
		await axios
			.get("/api/users/reset", {
				params: { resetPasswordToken: this.props.match.params.token }
			})
			.then(response => {
				console.log(response);
				if (response.data.message === "User Checks Out") {
					this.setState({
						email: response.data.email
					});
				} else {
					this.setState({
						error: "There was an error"
					});
				}
			})
			.catch(error => {
				console.log(error.data);
			});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		if (this.state.password === this.state.password2) {
			axios
				.post("/api/users/updatePassword", userData)
				.then(response => {
					console.log(response);
					if (response.data.message === "Password Updated") {
						alert("Your Password Was Updated!");
						this.props.history.push("/");
						//this.resetForm();
					} else {
						alert("There was an error");
					}
				})
				.catch(error => {
					this.setState({
						errors: {
							password: "Reset Link Expired"
						}
					});
				});
		} else {
			this.setState({
				errors: {
					password: "Passwords Dont Match"
				}
			});
		}
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="valign-wrapper">
				<img
					alt=""
					className="container-background"
					src="images/background.jpg"
				/>
				<AuthTopBar />
				<div className="auth-left">
					<AuthText />
				</div>
				<div className="auth-right auth-details">
					<div className="row">
						<div className="col s8 offset-s2">
							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<h4>
									<b style={{ color: "#dd137b" }}>
										Please Enter Your New Password
									</b>
								</h4>
							</div>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="input-field col s12">
									<input
										onChange={this.onChange}
										value={this.state.password}
										error={errors.password}
										id="password"
										type="password"
										className={classnames("", {
											invalid: errors.password
										})}
									/>
									<label htmlFor="password">Password</label>
									<span className="red-text">
										{errors.password}
									</span>
								</div>
								<div className="input-field col s12">
									<input
										onChange={this.onChange}
										value={this.state.password2}
										error={errors.password2}
										id="password2"
										type="password"
										className={classnames("", {
											invalid: errors.password2
										})}
									/>
									<label htmlFor="password2">
										Confirm Password
									</label>
									<span className="red-text">
										{errors.password2}
									</span>
								</div>
								<div
									className="col s12"
									style={{ paddingLeft: "11.250px" }}
								>
									<button
										style={{
											width: "150px",
											borderRadius: "3px",
											letterSpacing: "1.5px",
											marginTop: "1rem",
											backgroundColor: "#dd137b"
										}}
										type="submit"
										className="btn btn-large waves-effect waves-light hoverable"
									>
										Reset
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PasswordReset.propTypes = {
	resetPassword: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ resetPassword }
)(PasswordReset);
