
import {
	SET_PRIMARY_SOCK_COLOR,
	SET_SECONDARY_SOCK_COLOR,
	SAVE_DATA,
	SET_SOCK,
	SAVE_PREVIEW
} from "./types";

export const setPrimarySockColor = color => {
	return {
		type: SET_PRIMARY_SOCK_COLOR,
		hex: color.hex,
		red: color.rgb.r,
		blue: color.rgb.b,
		green: color.rgb.g
	};
};

export const setSecondarySockColor = color => {
	return {
		type: SET_SECONDARY_SOCK_COLOR,
		hex: color.hex,
		red: color.rgb.r,
		blue: color.rgb.b,
		green: color.rgb.g
	};
};

export const saveData = (side, data) => {
	return {
		type: SAVE_DATA,
		area: side,
		data: data
	};
};

export const setSock = type => {
	return {
		type: SET_SOCK,
		payload: type
	};
};

export const savePreview = img => {
	return {
		type: SAVE_PREVIEW,
		payload: img
	};
};
