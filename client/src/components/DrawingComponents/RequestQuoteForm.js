import React from "react";
import axios from "axios";
import { connect } from "react-redux";
//import "../styles/App.css";

export const RequestForm = (onSubmit, size, date, onChange, email, name) => {
	return (
		<form className="request-form" id="contact-form" onSubmit={onSubmit}>
			<div className="form-row input-field">
				<input
					disabled
					type="text"
					placeholder="Full Name"
					id="name"
					value={name}
				/>

				<input
					type="text"
					placeholder="Business Name"
					id="business-name"
					required
				/>
			</div>
			<div className="form-row input-field">
				<input
					disabled
					type="email"
					placeholder="Email Address"
					id="email"
					value={email}
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
						//defaultValue=""
						name="size"
						onChange={onChange}
						value={size}
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
						onChange={onChange}
						//defaultValue=""
						value={date}
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
};
