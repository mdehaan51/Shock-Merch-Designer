import axios from "axios";
import { SET_PRIMARY_SOCK_COLOR, SET_SECONDARY_SOCK_COLOR } from "./types";

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
