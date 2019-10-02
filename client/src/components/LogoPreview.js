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
		let logo = this.props.data.logo;
		let hidden = true;
		if (logo !== "" && logo !== null) {
			hidden = false;
		}
		let size = this.props.data.logoSize;
		let rotation = this.props.data.logoRotation;
		let style = {
			transform: `rotate(${rotation}deg) scale(${size})`
		};

		return (
			<div
				className={
					hidden === true
						? "deactivated"
						: "logo-preview-container grabable"
				}
				style={style}
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
