import axios from "axios";
import {
	SET_PRIMARY_SOCK_COLOR,
	SET_SECONDARY_SOCK_COLOR,
	SAVE_DATA,
	SET_SOCK,
	SAVE_PREVIEW
} from "../actions/types";

const initialState = {
	primary: {
		hex: "#b91f1f",
		red: 185,
		green: 31,
		blue: 31
	},
	secondary: {
		hex: "#333fb4",
		red: 51,
		green: 63,
		blue: 180
	},
	sideData: null,
	bottomData: null,
	topData: null,
	sockType: "crew",
	preview: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_PRIMARY_SOCK_COLOR:
			return {
				...state,
				primary: {
					hex: action.hex,
					red: action.red,
					blue: action.blue,
					green: action.green
				}
			};
		case SET_SECONDARY_SOCK_COLOR:
			return {
				...state,
				secondary: {
					hex: action.hex,
					red: action.red,
					blue: action.blue,
					green: action.green
				}
			};
		case SAVE_DATA:
			if (action.area === "side") {
				return {
					...state,
					sideData: action.data
				};
			} else if (action.area === "bottom") {
				return {
					...state,
					bottomData: action.data
				};
			} else if (action.area === "top") {
				return {
					...state,
					topData: action.data
				};
			}
		case SET_SOCK:
			return {
				...state,
				sockType: action.payload
			};
			break;
		case SAVE_PREVIEW:
			return {
				...state,
				preview: action.payload
			};

		default:
			return state;
	}
}
