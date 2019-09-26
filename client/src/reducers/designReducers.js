import {
	SET_DESIGN_COLOR,
	SET_DESIGN_FONT,
	TOGGLE_MODAL,
	SET_FONT_SIZE,
	SET_FONT_ROTATION,
	SET_FONT_WEIGHT,
	SET_LINE_HEIGHT,
	SET_TEXT_COLOR,
	SAVE_LOGO
} from "../actions/types";

const initialState = {
	modal: {
		active: false,
		type: "request",
		title: "Lets Get This Park Started!"
	},
	font: "My Park",
	primary: "#A8DF54",
	secondary: "#A8DF54",
	fontSize: 18,
	fontRotation: 0,
	fontWeight: 200,
	lineHeight: 18,
	textColor: "white",
	logo: ""
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
		case SET_FONT_SIZE:
			return {
				...state,
				fontSize: action.payload
			};
		case SET_FONT_ROTATION:
			return {
				...state,
				fontRotation: action.payload
			};
		case SET_FONT_WEIGHT:
			return {
				...state,
				fontWeight: action.payload
			};
		case SET_LINE_HEIGHT:
			return {
				...state,
				lineHeight: action.payload
			};
		case SET_TEXT_COLOR:
			return {
				...state,
				textColor: action.payload
			};
		case SAVE_LOGO:
			return {
				...state,
				logo: action.payload
			};

		default:
			return state;
	}
}
