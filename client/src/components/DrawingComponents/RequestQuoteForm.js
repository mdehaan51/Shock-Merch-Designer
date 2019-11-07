import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { imgSrcToDataURL } from "blob-util";
//import "../styles/App.css";

class RequestForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sideImage: []
		};
	}

	onSubmit = e => {
		e.preventDefault();

		var bottom = this.props.drawing.bottomData;

		if (this.props.drawing.preview) {
			const preview = async () => {
				console.log("this is a preview");
				const data = imgSrcToDataURL(this.props.drawing.preview).then(
					data => {
						return data;
					}
				);
				console.log(data);
				const result = await data;
				this.changeImage(result);
			};
			preview();
		} else {
			this.changeImage(bottom);
		}
	};

	changeImage = bottomData => {
		const name = document.getElementById("name").value;
		const business = document.getElementById("business-name").value;
		const email = document.getElementById("email").value;
		const phone = document.getElementById("phone").value;
		const city = document.getElementById("city").value;
		const country = document.getElementById("country").value;
		const message = document.getElementById("message").value;
		const number = document.getElementById("number").value;
		const time = document.getElementById("time").value;
		const side = this.props.drawing.sideData;
		var bottom = bottomData;
		const top = this.props.drawing.topData;
		var imageStrings = [];
		var images = this.props.side.images.concat(
			this.props.bottom.images,
			this.props.top.images
		);
		if (images.length > 0) {
			let promiseArr = images.map(async items => {
				var content = imgSrcToDataURL(items.src).then(dataURL => {
					return dataURL;
				});
				let result = await content;
				imageStrings.push(result);
			});
			console.log(promiseArr);

			Promise.all(promiseArr)
				.then(result => {
					let messageData = {
						name: name,
						business: business,
						email: email,
						phone: phone,
						location: city + " " + country,
						number: number,
						time: time,
						message: message,
						side: side,
						bottom: bottom,
						top: top,
						images: imageStrings
					};

					this.sendMessage(messageData);
				})
				.catch(err => {});

			/*this.props.side.images.forEach(async function(items) {
				console.log(items);
				var content = await imgSrcToDataURL(items.src)
					.then(dataURL => {
						console.log(dataURL);

						return dataURL;
						console.log(sideImages);
					})
					.catch(err => {
						console.log(err);
					});
				sideImages.push(content);
			});*/
		} else {
			let messageData = {
				name: name,
				business: business,
				email: email,
				phone: phone,
				location: city + " " + country,
				number: number,
				time: time,
				message: message,
				side: side,
				bottom: bottom,
				top: top,
				sideImages: [],
				bottomImages: [],
				topImages: []
			};
			this.sendMessage(messageData);
		}
	};

	sendMessage = messageData => {
		console.log("sending");
		axios({
			method: "POST",
			url: "/api/users/save_user",
			data: messageData
		});

		axios({
			method: "POST",
			url: "/api/mailer/send",
			data: messageData
		}).then(response => {
			if (response.data.msg === "success") {
				alert("Message Sent.");
			} else if (response.data.msg === "fail") {
				alert("Message failed to send. Please try again later.");
			}
		});
	};

	render() {
		return (
			<form
				className="request-form"
				id="contact-form"
				onSubmit={this.onSubmit}
			>
				<div className="form-row input-field">
					<input type="text" placeholder="Full Name" id="name" />

					<input
						type="text"
						placeholder="Business Name"
						id="business-name"
						required
					/>
				</div>
				<div className="form-row input-field">
					<input
						type="email"
						placeholder="Email Address"
						id="email"
					/>
					<input
						type="tel"
						placeholder="Phone Number"
						id="phone"
						required
					/>
				</div>
				<div className="form-row input-field">
					<input
						type="text"
						placeholder="City, State"
						id="city"
						required
					/>
					<input
						type="text"
						placeholder="Country"
						id="country"
						required
					/>
				</div>
				<div className="form-row input-field">
					<div className="form-select">
						<label>How Many Pairs Do You Need?</label>
						<select
							className="browser-default"
							id="number"
							//defaultValue=""
							name="size"
							//onChange={onChange}
							//value={size}
						>
							<option value="" disabled>
								How Many Pairs Do You Need?
							</option>
							<option value="500-100 Pairs">500-1000</option>
							<option value="1000-5000 Pairs">1000-5000</option>
							<option value="5000+ Pairs">5000+</option>
						</select>
					</div>
					<div className="form-select">
						<label>When Do You Need Them></label>
						<select
							className="browser-default"
							name="date"
							//onChange={onChange}
							id="time"
							//defaultValue=""
							//value={date}
						>
							<option value="" disabled>
								When Do You Need Them?
							</option>
							<option value="ASAP">As Soon As Possible</option>
							<option value="2-6 Months">2-6 Months</option>
							<option value="More than 6 Months">
								More than 6 Months
							</option>
						</select>
					</div>
				</div>
				<div className="form-row input-field">
					<textarea
						className="materialize-textarea"
						type="text"
						placeholder="Give us some details about what you need!"
						id="message"
						style={{
							height: "100px"
						}}
					/>
				</div>
				<button className="button hoverable" type="submit">
					Submit
				</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	design: state.design,
	drawing: state.drawing,
	side: state.side,
	bottom: state.bottom,
	top: state.top
});

export default connect(mapStateToProps)(RequestForm);
