import React, { Component } from "react";
import ReactDOM from "react-dom";
import ShapeList from "./ShapeList.js";

class ShapeSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="shape-list-container">
				<h4>Select A Shape</h4>
				<div className="shape-list row">
					{ShapeList.map((item, id) => {
						console.log(item);
						return (
							<div key={id} className="shape-list-item col s4">
								<img src={item.src} />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default ShapeSelector;
