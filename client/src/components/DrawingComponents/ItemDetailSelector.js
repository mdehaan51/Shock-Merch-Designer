import React, { Component } from "react";
import ReactDOM from "react-dom";

import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import { connect } from "react-redux";

class ItemDetailSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			down: false,
			up: false
		};
	}

	countUp = () => {
		if (this.props.type === "fontSize") {
			this.props.setFontSize(
				this.props.data.fontSize + 1,
				this.props.view
			);
			this.checkRange(this.props.data.fontSize, 72, "up");
		} else if (this.props.type === "rotation") {
			this.props.setFontRotation(
				this.props.data.fontRotation + 15,
				this.props.view
			);
			this.checkRange(this.props.data.fontRotation, 165, "up");
		} else if (this.props.type === "weight") {
			this.props.setFontWeight(
				this.props.data.fontWeight + 100,
				this.props.view
			);
			this.checkRange(this.props.data.fontWeight, 800, "up");
		} else if (this.props.type === "height") {
			this.props.setLineHeight(
				this.props.data.lineHeight + 1,
				this.props.view
			);
			this.checkRange(this.props.data.lineHeight, 49, "up");
		}
	};

	countDown = () => {
		if (this.props.type === "fontSize") {
			this.props.setFontSize(
				this.props.data.fontSize - 1,
				this.props.view
			);
			this.checkRange(this.props.data.fontSize, 10, "down");
		} else if (this.props.type === "rotation") {
			this.props.setFontRotation(
				this.props.data.fontRotation - 15,
				this.props.view
			);
			this.checkRange(this.props.data.fontRotation, -165, "down");
		} else if (this.props.type === "weight") {
			this.props.setFontWeight(
				this.props.data.fontWeight - 100,
				this.props.view
			);
			this.checkRange(this.props.data.fontWeight, 200, "down");
		} else if (this.props.type === "height") {
			this.props.setLineHeight(
				this.props.data.lineHeight - 1,
				this.props.view
			);
			this.checkRange(this.props.data.lineHeight, 1, "down");
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
		if (type) {
			if (type === "fontSize") {
				value = this.props.data.fontSize;
			} else if (type === "rotation") {
				value = this.props.data.fontRotation;
			} else if (type === "weight") {
				value = this.props.data.fontWeight;
			} else if (type === "height") {
				value = this.props.data.lineHeight;
			}
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

export default connect(mapStateToProps)(ItemDetailSelector);
