import axios from "axios";
import {
	SET_PRIMARY_SOCK_COLOR,
	SET_SECONDARY_SOCK_COLOR
} from "../actions/types";

const initialState = {
	primary: {
		hex: "#fffff",
		red: 72,
		green: 60,
		blue: 133
	},
	secondary: {
		hex: "#fffff",
		red: 72,
		green: 60,
		blue: 133
	}
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

		default:
			return state;
	}
}
