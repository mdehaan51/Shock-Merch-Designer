import React, { Component } from "react";
import ReactDOM from "react-dom";

import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import {
	setFontSize,
	setFontRotation,
	setFontWeight,
	setLineHeight
} from "../actions/designActions";
import { connect } from "react-redux";

class FontSizeSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			down: false,
			up: false
		};
	}

	countUp = () => {
		if (this.props.type === "fontSize") {
			this.props.setFontSize(this.props.design.fontSize + 1);
			this.checkRange(this.props.design.fontSize, 72, "up");
		} else if (this.props.type === "rotation") {
			this.props.setFontRotation(this.props.design.fontRotation + 15);
			this.checkRange(this.props.design.fontRotation, 165, "up");
		} else if (this.props.type === "weight") {
			this.props.setFontWeight(this.props.design.fontWeight + 100);
			this.checkRange(this.props.design.fontWeight, 800, "up");
		} else if (this.props.type === "height") {
			this.props.setLineHeight(this.props.design.lineHeight + 1);
			this.checkRange(this.props.design.lineHeight, 49, "up");
		}
	};

	countDown = () => {
		if (this.props.type === "fontSize") {
			this.props.setFontSize(this.props.design.fontSize - 1);
			this.checkRange(this.props.design.fontSize, 10, "down");
		} else if (this.props.type === "rotation") {
			this.props.setFontRotation(this.props.design.fontRotation - 15);
			this.checkRange(this.props.design.fontRotation, -165, "down");
		} else if (this.props.type === "weight") {
			this.props.setFontWeight(this.props.design.fontWeight - 100);
			this.checkRange(this.props.design.fontWeight, 200, "down");
		} else if (this.props.type === "height") {
			this.props.setLineHeight(this.props.design.lineHeight - 1);
			this.checkRange(this.props.design.lineHeight, 1, "down");
		}
	};

	checkRange = (value, limiter, type) => {
		if (type == "down") {
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
		if (type === "fontSize") {
			value = this.props.design.fontSize;
		} else if (type === "rotation") {
			value = this.props.design.fontRotation;
		} else if (type === "weight") {
			value = this.props.design.fontWeight;
		} else if (type === "height") {
			value = this.props.design.lineHeight;
		}
		return (
			<div className="number-picker">
				<div className="number-picker-numbers">
					<input
						type="number"
						className="number-picker-input"
						value={value}
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
	{ setFontSize, setFontRotation, setFontWeight, setLineHeight }
)(FontSizeSelect);
