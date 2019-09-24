import React from "react";

export const NavButton = ({ name, onClick }) => (
	<button className="button hoverable" onClick={onClick}>
		{name}
	</button>
);

export const NavInput = ({ placeholder, onChange }) => (
	<input
		className="input"
		type="number"
		placeholder={placeholder}
		onChange={onChange}
	/>
);

export const AuthText = () => (
	<div className="auth-text-container">
		<div className="auth-text-first-line">
			Don't pay those expensive printing fees
		</div>
		<h1 className="auth-text-header">
			Custom Merchandise for your Family Entertainment Business
		</h1>

		<p className="auth-text-paragraph">
			We Understand. You have the perfect location. You have a vision of
			what you want your park to look like, what features you want to
			have, but how do you relay that to someone else? We understand your
			troubles, thats why we created the Shock Trampoline Park Builder.{" "}
			This interactive tool allows you to design your park however you
			like, and then submit it to us directly for a smooth and simple
			quoting process. So what are you waiting for?
			<br />
			<br />
			Go ahead and register and get building!
		</p>
	</div>
);

export const AuthTopBar = () => (
	<div className="auth-top-bar">
		<img
			className="top-bar-img"
			src="images/shocklogov2.png"
			alt="shock-logo"
		/>
	</div>
);

export const UserTable = ({ name, email, phone, location, business }) => (
	<tr>
		<td>{name}</td>
		<td>{email}</td>
		<td>{phone}</td>
		<td>{location}</td>
		<td>{business}</td>
	</tr>
);

