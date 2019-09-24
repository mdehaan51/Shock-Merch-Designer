import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import classnames from "classnames";
import { AuthText, AuthTopBar } from "../constants.js";

class ForgotPassword extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard"); // push user to dashboard when they login
		}
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
		let host =
			window.location.hostname == "localhost"
				? window.location.hostname
				: "www.shocktrampolineparkbuilder.com";
		const userData = {
			email: this.state.email,
			host: host
		};
		this.props.resetPassword(userData);
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
										Forget Your Password?
									</b>
								</h4>
								<p>
									<Link
										to="/"
										style={{
											color: "#dd137b",
											fontWeight: "bold"
										}}
									>
										Back To Login
									</Link>
								</p>
							</div>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="input-field col s12">
									<input
										onChange={this.onChange}
										value={this.state.email}
										error={errors.email}
										id="email"
										type="email"
										className={classnames("", {
											invalid:
												errors.email ||
												errors.emailnotfound
										})}
									/>
									<label htmlFor="email">Email</label>
									<span className="red-text">
										{errors.email}
										{errors.emailnotfound}
									</span>
									<span className="green-text">
										{errors.success}
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

ForgotPassword.propTypes = {
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
)(ForgotPassword);
