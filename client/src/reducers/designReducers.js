import {
	SET_DESIGN_COLOR,
	SET_DESIGN_FONT,
	TOGGLE_MODAL
} from "../actions/types";

const initialState = {
	modal: {
		active: false,
		type: "request",
		title: "Lets Get This Park Started!"
	},
	primary: "#A8DF54",
	secondary: "#A8DF54",
	font: ""
};

export default function(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_MODAL:
			return {
				...state,
				modal: {
					active: action.payload.active,
					type: action.payload.type,
					title: action.payload.title
				}
			};
		case SET_DESIGN_COLOR:
			if (action.payload.primary) {
				return {
					...state,
					primary: action.payload.primary
				};
			} else {
				return {
					...state,
					secondary: action.payload.secondary
				};
			}
		case SET_DESIGN_FONT:
			return {
				...state,
				font: action.payload
			};

		default:
			return state;
	}
}
