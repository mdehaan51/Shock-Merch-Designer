import {
	SET_DESIGN_COLOR,
	SET_DESIGN_FONT,
	TOGGLE_MODAL,
	SET_FONT_SIZE,
	SET_FONT_ROTATION,
	SET_FONT_WEIGHT,
	SET_LINE_HEIGHT,
	SET_TEXT_COLOR,
	SAVE_LOGO,
	SET_LOGO_SIZE,
	SET_LOGO_ROTATION
} from "../actions/types";

const initialState = {
	modal: {
		active: false,
		type: "request",
		title: "Lets Get This Park Started!"
	},
	side: {
		font: "My Park",
		//primary: "#A8DF54",
		//secondary: "#A8DF54",
		fontSize: 18,
		fontRotation: 0,
		fontWeight: 200,
		lineHeight: 18,
		textColor: "white",
		logo: "",
		logoSize: 1.0,
		logoRotation: 0,
		sockPic: "images/side-sock.png"
	},
	bottom: {
		font: "My Park",
		//primary: "#A8DF54",
		//secondary: "#A8DF54",
		fontSize: 18,
		fontRotation: 0,
		fontWeight: 200,
		lineHeight: 18,
		textColor: "white",
		logo: "",
		logoSize: 1.0,
		logoRotation: 0,
		sockPic: "images/bottom-sock.png"
	},
	top: {
		font: "My Park",
		//primary: "#A8DF54",
		//secondary: "#A8DF54",
		fontSize: 18,
		fontRotation: 0,
		fontWeight: 200,
		lineHeight: 18,
		textColor: "white",
		logo: "",
		logoSize: 1.0,
		logoRotation: 0,
		sockPic: "images/GreenSock.png"
	}
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
			let key = Object.keys(action.payload);
			let value = Object.values(action.payload)[0];
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, [key]: value }
				};
			}
			break;
		case SET_DESIGN_FONT:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, font: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, font: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, font: action.payload }
				};
			}
			break;
		case SET_FONT_SIZE:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, fontSize: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, fontSize: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, fontSize: action.payload }
				};
			}
			break;
		case SET_FONT_ROTATION:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, fontRotation: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, fontRotation: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, fontRotation: action.payload }
				};
			}
			break;
		case SET_FONT_WEIGHT:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, fontWeight: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, fontWeight: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, fontWeight: action.payload }
				};
			}
			break;
		case SET_LINE_HEIGHT:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, lineHeight: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, lineHeight: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, lineHeight: action.payload }
				};
			}
			break;
		case SET_TEXT_COLOR:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, textColor: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, textColor: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, textColor: action.payload }
				};
			}
			break;
		case SAVE_LOGO:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, logo: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, logo: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, logo: action.payload }
				};
			}
			break;
		case SET_LOGO_SIZE:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, logoSize: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, logoSize: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, logoSize: action.payload }
				};
			}
			break;
		case SET_LOGO_ROTATION:
			if (action.id === "side") {
				return {
					...state,
					side: { ...state.side, logoRotation: action.payload }
				};
			} else if (action.id === "bottom") {
				return {
					...state,
					bottom: { ...state.bottom, logoRotation: action.payload }
				};
			} else if (action.id === "top") {
				return {
					...state,
					top: { ...state.top, logoRotation: action.payload }
				};
			}
			break;

		default:
			return state;
	}
}
