import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { AuthTopBar } from "../constants.js";

class AdminLogin extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAdmin) {
			this.props.history.push("/admin-dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAdmin) {
			this.props.history.push("/admin-dashboard"); // push user to dashboard when they login
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
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginAdmin(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="valign-wrapper">
				<AuthTopBar />
				<div className="row">
					<div className="col s8 offset-s2">
						<div
							className="col s12"
							style={{ paddingLeft: "11.250px" }}
						>
							<h4>
								<b style={{ color: "#dd137b" }}>Admin Login</b>
							</h4>
							<p
								className="text-darken-1"
								style={{ color: "#dd137b" }}
							>
								Not an Admin?{" "}
								<Link
									to="/"
									style={{
										color: "#dd137b",
										fontWeight: "bold"
									}}
								>
									Go Back
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
											errors.emailnotfound ||
											errors.notadmin
									})}
								/>
								<label htmlFor="email">Email</label>
								<span className="red-text">
									{errors.email}
									{errors.emailnotfound}
									{errors.notadmin}
								</span>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
									id="password"
									type="password"
									className={classnames("", {
										invalid:
											errors.password ||
											errors.passwordincorrect
									})}
								/>
								<label htmlFor="password">Password</label>
								<span className="red-text">
									{errors.password}
									{errors.passwordincorrect}
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
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

AdminLogin.propTypes = {
	loginAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginAdmin }
)(AdminLogin);
