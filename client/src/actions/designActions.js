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
	SAVE_LOGO
} from "./types";

export const toggleModal = modalInfo => {
	return {
		type: TOGGLE_MODAL,
		payload: modalInfo
	};
};

export const saveColor = (name, color) => {
	var obj = {};
	obj[name] = color;
	return {
		type: SET_DESIGN_COLOR,
		payload: obj
	};
};

export const addText = (name, text) => {
	var obj = {};
	obj[name] = text;
	return {
		type: SET_DESIGN_FONT,
		payload: text
	};
};

export const setFontSize = size => {
	return {
		type: SET_FONT_SIZE,
		payload: size
	};
};

export const setFontRotation = size => {
	return {
		type: SET_FONT_ROTATION,
		payload: size
	};
};

export const setFontWeight = size => {
	return {
		type: SET_FONT_WEIGHT,
		payload: size
	};
};

export const setLineHeight = size => {
	return {
		type: SET_LINE_HEIGHT,
		payload: size
	};
};

export const textColor = color => {
	return {
		type: SET_TEXT_COLOR,
		payload: color
	};
};

export const saveLogo = logo => {
	console.log(logo);
	return {
		type: SAVE_LOGO,
		payload: logo
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
