import React, { Component } from "react";
import Moment from "react-moment";
import * as moment from "moment";
import ReactTable from "react-table";
import "react-table/react-table.css";

import { connect } from "react-redux";
import { getAllUsers } from "../../actions/adminActions";
import { logoutUser } from "../../actions/authActions";
import { AuthTopBar, UserTable } from "../constants.js";
import { CSVLink, CSVDownload } from "react-csv";

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
		const columns = [
			{
				Header: "Name",
				accessor: "name"
			},
			{ Header: "Email", accessor: "email" },
			{ Header: "Phone", accessor: "phone" },
			{ Header: "Location", accessor: "location" },
			{ Header: "Business", accessor: "business" },
			{
				Header: "Date",
				accessor: "date",
				Cell: props => (
					<span>{moment(props.value).format("YYYY/MM/DD")}</span>
				)
			}
		];
		const csvHeaders = [
			{ label: "Name", key: "name" },
			{ label: "Email", key: "email" },
			{ label: "Phone", key: "phone" },
			{ label: "Location", key: "location" },
			{ label: "Business", key: "business" },
			{ label: "Date", key: "date" }
		];
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
					{this.state.users.length > 0 ? (
						<React.Fragment>
							<CSVLink
								className="export-button"
								data={this.state.users}
								headers={csvHeaders}
							>
								Export
							</CSVLink>
							<ReactTable
								data={this.state.users}
								columns={columns}
								defaultPageSize={10}
							/>
						</React.Fragment>
					) : null}
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
