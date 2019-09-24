import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/ProductPreview.css";

class ProductPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="preview-container">
				<img className="preview-img" src="images/GreenSocks.png" />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design
});

export default connect(mapStateToProps)(ProductPreview);
