import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllUsers } from "../../actions/adminActions";
import { logoutUser } from "../../actions/authActions";
import { AuthTopBar, UserTable } from "../constants.js";

class AdminDashboard extends Component {
	constructor() {
		super();
		this.state = {
			users: []
		};
	}

	componentWillMount() {
		this.props.getAllUsers();
		this.setState({
			users: this.props.admin.users
		});
	}

	componentDidMount() {
		console.log(this.props.admin.users);
		this.setState({
			users: this.props.admin.users
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.admin !== this.props.admin) {
			this.setState({
				users: this.props.admin.users
			});
		}
	}

	onLogoutClick = e => {
		e.preventDefault();
		this.props.history.push("/");
		this.props.logoutUser(this.props.history);
	};

	render() {
		console.log(this.props.admin.users);
		return (
			<div className="valign-wrapper">
				<AuthTopBar />
				<a
					onClick={this.onLogoutClick}
					className="admin-logout-button "
				>
					Logout
				</a>
				<div className="table-container">
					<table style={{ width: "80%" }}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Location</th>
								<th>Business</th>
							</tr>
						</thead>
						<tbody>
							{this.state.users.length > 0 ? (
								this.state.users.map((items, id) => {
									console.log(items);
									return (
										<UserTable
											key={id}
											name={items.name}
											email={items.email}
											phone={items.phone}
											location={items.location}
											business={items.business}
										/>
									);
								})
							) : (
								<tr>
									<td>Loading</td>
									<td>Loading</td>
									<td>Loading</td>
									<td>Loading</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	admin: state.admin,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getAllUsers, logoutUser }
)(AdminDashboard);
