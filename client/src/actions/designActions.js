import axios from "axios";
import {
	SET_DESIGN_COLOR,
	SET_DESIGN_FONT,
	TOGGLE_MODAL,
	SET_FONT_SIZE,
	SET_FONT_ROTATION,
	SET_FONT_WEIGHT,
	SET_LINE_HEIGHT,
	SET_TEXT_COLOR,
	SAVE_LOGO,
	SET_LOGO_SIZE,
	SET_LOGO_ROTATION
} from "./types";

export const toggleModal = modalInfo => {
	return {
		type: TOGGLE_MODAL,
		payload: modalInfo
	};
};

export const saveColor = (name, color, id) => {
	var obj = {};
	obj[name] = color;
	return {
		type: SET_DESIGN_COLOR,
		payload: obj,
		id: id
	};
};

export const addText = (name, text, id) => {
	var obj = {};
	obj[name] = text;
	return {
		type: SET_DESIGN_FONT,
		payload: text,
		id: id
	};
};

export const setFontSize = (size, id) => {
	return {
		type: SET_FONT_SIZE,
		payload: size,
		id: id
	};
};

export const setFontRotation = (size, id) => {
	return {
		type: SET_FONT_ROTATION,
		payload: size,
		id: id
	};
};

export const setFontWeight = (size, id) => {
	return {
		type: SET_FONT_WEIGHT,
		payload: size,
		id: id
	};
};

export const setLineHeight = (size, id) => {
	return {
		type: SET_LINE_HEIGHT,
		payload: size,
		id: id
	};
};

export const textColor = (color, id) => {
	return {
		type: SET_TEXT_COLOR,
		payload: color,
		id: id
	};
};

export const saveLogo = (logo, id) => {
	console.log(logo);
	return {
		type: SAVE_LOGO,
		payload: logo,
		id: id
	};
};

export const setLogoSize = (size, id) => {
	console.log(size);
	return {
		type: SET_LOGO_SIZE,
		payload: size,
		id: id
	};
};

export const setLogoRotation = (size, id) => {
	return {
		type: SET_LOGO_ROTATION,
		payload: size,
		id: id
	};
};

export const quoteRequest = messageData => {
	axios.post("/api/mailer/send", messageData).then(response => {
		if (response.data.msg === "success") {
			alert("Message Sent.");
			//this.resetForm();
		} else if (response.data.msg === "fail") {
			alert("Message failed to send.");
		}
	});
};
