import axios from "axios";
import { SET_DESIGN_COLOR, SET_DESIGN_FONT, TOGGLE_MODAL } from "./types";

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

export const addText = text => {
	return {
		type: SET_DESIGN_FONT,
		payload: text
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
