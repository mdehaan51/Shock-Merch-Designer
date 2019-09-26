import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/ProductPreview.css";

class TextPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: true
		};
	}

	componentDidUpdate(prevProps) {}

	render() {
		let logo = this.props.design.logo;
		let hidden = true;
		if (logo !== "") {
			hidden = false;
		}

		return (
			<div
				className={
					hidden === true
						? "deactivated"
						: "logo-preview-container grabable"
				}
			>
				<img
					className={hidden === true ? "deactivated" : ""}
					src={logo}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(mapStateToProps)(TextPreview);
