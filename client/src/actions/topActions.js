import axios from "axios";
import {
	ADD_TOP_TEXT,
	UPDATE_TOP_TEXT,
	SELECT_TOP_TEXT,
	ADD_TOP_IMAGE,
	UPDATE_TOP_IMAGES,
	SELECT_TOP_IMAGE,
	COPY_TOP_IMAGE,
	DELETE_TOP_IMAGE
} from "./types";

export const addText = (text, style) => {
	return {
		type: ADD_TOP_TEXT,
		id: "textbox",
		text: text,
		style: style
	};
};

export const updateText = items => {
	return {
		type: UPDATE_TOP_TEXT,
		items: items
	};
};

export const selectText = id => {
	return {
		type: SELECT_TOP_TEXT,
		id: id
	};
};

export const addImage = image => {
	return {
		type: ADD_TOP_IMAGE,
		id: "image",
		payload: image
	};
};

export const updateImages = items => {
	return {
		type: UPDATE_TOP_IMAGES,
		id: "image",
		items: items
	};
};

export const selectImage = id => {
	return {
		type: SELECT_TOP_IMAGE,
		id: id
	};
};

export const copyImage = image => {
	return {
		type: COPY_TOP_IMAGE,
		payload: image
	};
};

export const deleteImage = image => {
	return {
		type: DELETE_TOP_IMAGE,
		payload: image
	};
};
