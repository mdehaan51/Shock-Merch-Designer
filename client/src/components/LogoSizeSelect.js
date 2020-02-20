import React, { Component } from "react";


import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import {
	setLogoSize,
	setLogoRotation,
	
} from "../actions/designActions";
import { connect } from "react-redux";

class LogoSizeSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			down: false,
			up: false
		};
	}

	countUp = () => {
		if (this.props.type === "LogoSize") {
			this.props.setLogoSize(
				this.props.data.logoSize + 0.1,
				this.props.view
			);
			this.checkRange(this.props.data.logoSize, 72, "up");
		} else if (this.props.type === "rotation") {
			this.props.setLogoRotation(
				this.props.data.logoRotation + 15,
				this.props.view
			);
			this.checkRange(this.props.data.logoRotation, 165, "up");
		}
	};

	countDown = () => {
		if (this.props.type === "LogoSize") {
			this.props.setLogoSize(
				this.props.data.logoSize - 0.1,
				this.props.view
			);
			this.checkRange(
				this.props.data.logoSize,
				0.20000000000000015,
				"down"
			);
		} else if (this.props.type === "rotation") {
			this.props.setLogoRotation(
				this.props.data.logoRotation - 15,
				this.props.view
			);
			this.checkRange(this.props.data.logoRotation, -165, "down");
		}
	};

	checkRange = (value, limiter, type) => {
		if (type === "down") {
			value === limiter
				? this.setState({
						down: true,
						up: false
				  })
				: this.setState({
						down: false,
						up: false
				  });
		} else {
			value === limiter
				? this.setState({
						up: true,
						down: false
				  })
				: this.setState({
						up: false,
						down: false
				  });
		}
	};

	render() {
		let type = this.props.type;
		let value = "";
		if (type === "LogoSize") {
			value = this.props.data.logoSize;
			value = value.toFixed(1);
		} else if (type === "rotation") {
			value = this.props.data.logoRotation;
		}
		return (
			<div className="number-picker">
				<div className="number-picker-numbers">
					<input
						type="number"
						className="number-picker-input"
						value={value}
						step="0.1"
					/>
					<p>{this.props.unit}</p>
				</div>
				<div className="number-picker-arrows">
					<div
						className={
							this.state.up === true
								? "deactivated up-arrow"
								: "up-arrow"
						}
						onClick={this.countUp}
					>
						<FaCaretUp />
					</div>
					<div
						className={
							this.state.down === true
								? "deactivated down-arrow"
								: "down-arrow"
						}
						onClick={this.countDown}
					>
						<FaCaretDown />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	design: state.design
});

export default connect(
	mapStateToProps,
	{ setLogoSize, setLogoRotation }
)(LogoSizeSelect);
