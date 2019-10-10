import axios from "axios";
import {
	ADD_SHAPE,
	UPDATE_SHAPES,
	SET_SHAPE_COLOR,
	ADD_BOTTOM_TEXT,
	UPDATE_BOTTOM_TEXT,
	SELECT_BOTTOM_TEXT,
	ADD_BOTTOM_IMAGE,
	UPDATE_BOTTOM_IMAGES,
	SELECT_BOTTOM_IMAGE
} from "./types";

export const setShapeColor = color => {
	console.log(color.hex);
	return {
		type: SET_SHAPE_COLOR,
		hex: color.hex,
		red: color.rgb.r,
		blue: color.rgb.b,
		green: color.rgb.g
	};
};

export const addShape = (src, name, loc) => {
	return {
		type: ADD_SHAPE,
		src: src,
		id: name,
		loc: loc
	};
};

export const updateShapes = items => {
	return {
		type: UPDATE_SHAPES,
		items: items
	};
};

export const addText = (text, style) => {
	return {
		type: ADD_BOTTOM_TEXT,
		id: "textbox",
		text: text,
		style: style
	};
};

export const updateText = items => {
	return {
		type: UPDATE_BOTTOM_TEXT,
		items: items
	};
};

export const selectText = id => {
	return {
		type: SELECT_BOTTOM_TEXT,
		id: id
	};
};

export const addImage = image => {
	return {
		type: ADD_BOTTOM_IMAGE,
		id: "image",
		payload: image
	};
};

export const updateImages = items => {
	return {
		type: UPDATE_BOTTOM_IMAGES,
		id: "image",
		items: items
	};
};

export const selectImage = id => {
	return {
		type: SELECT_BOTTOM_IMAGE,
		id: id
	};
};
