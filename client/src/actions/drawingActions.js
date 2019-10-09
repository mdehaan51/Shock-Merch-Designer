import axios from "axios";
import {
	SET_PRIMARY_SOCK_COLOR,
	SET_SECONDARY_SOCK_COLOR,
	SET_SHAPE_COLOR,
	ADD_SHAPE,
	UPDATE_SHAPES,
	ADD_TEXT,
	UPDATE_SIDE_TEXT,
	SELECT_TEXT,
	SAVE_IMAGE,
	UPDATE_IMAGES
} from "./types";

export const setPrimarySockColor = color => {
	console.log(color.hex);
	return {
		type: SET_PRIMARY_SOCK_COLOR,
		hex: color.hex,
		red: color.rgb.r,
		blue: color.rgb.b,
		green: color.rgb.g
	};
};

export const setSecondarySockColor = color => {
	console.log(color.hex);
	return {
		type: SET_SECONDARY_SOCK_COLOR,
		hex: color.hex,
		red: color.rgb.r,
		blue: color.rgb.b,
		green: color.rgb.g
	};
};

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

export const addShape = (src, name) => {
	return {
		type: ADD_SHAPE,
		src: src,
		id: name
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
		type: ADD_TEXT,
		id: "textbox",
		text: text,
		style: style
	};
};

export const updateSideText = items => {
	return {
		type: UPDATE_SIDE_TEXT,
		items: items
	};
};

export const selectText = id => {
	return {
		type: SELECT_TEXT,
		id: id
	};
};

/*export const selectObject = (arr, item, id) => {
	return {
		type: SELECT_OBJECT
	};
};*/

export const saveImage = image => {
	console.log(image);
	return {
		type: SAVE_IMAGE,
		payload: image
	};
};

export const updateImages = items => {
	return {
		type: UPDATE_IMAGES,
		id: "image",
		items: items
	};
};
