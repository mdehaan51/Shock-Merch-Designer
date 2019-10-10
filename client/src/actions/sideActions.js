import axios from "axios";
import {
	ADD_SIDE_TEXT,
	UPDATE_SIDE_TEXT,
	SELECT_SIDE_TEXT,
	ADD_SIDE_IMAGE,
	UPDATE_SIDE_IMAGES,
	SELECT_SIDE_IMAGE
} from "./types";

export const addText = (text, style) => {
	return {
		type: ADD_SIDE_TEXT,
		id: "textbox",
		text: text,
		style: style
	};
};

export const updateText = items => {
	return {
		type: UPDATE_SIDE_TEXT,
		items: items
	};
};

export const selectText = id => {
	return {
		type: SELECT_SIDE_TEXT,
		id: id
	};
};

export const addImage = image => {
	return {
		type: ADD_SIDE_IMAGE,
		id: "image",
		payload: image
	};
};

export const updateImages = items => {
	return {
		type: UPDATE_SIDE_IMAGES,
		id: "image",
		items: items
	};
};

export const selectImage = id => {
	return {
		type: SELECT_SIDE_IMAGE,
		id: id
	};
};
