import axios from "axios";
import { SET_GRID_SIZE, TOGGLE_MODAL } from "./types";

export const setGridSize = dimensions => {
	return {
		type: SET_GRID_SIZE,
		payload: dimensions
	};
};

export const toggleModal = modalInfo => {
	return {
		type: TOGGLE_MODAL,
		payload: modalInfo
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
