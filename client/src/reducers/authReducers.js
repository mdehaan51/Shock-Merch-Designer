import {
	SET_CURRENT_USER,
	USER_LOADING,
	SET_GRID_SIZE,
	SET_CURRENT_ADMIN
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false,
	dimensions: {},
	isAdmin: false
};
export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case SET_CURRENT_ADMIN:
			return {
				...state,
				user: action.payload,
				isAdmin: !isEmpty(action.payload)
			};
		case USER_LOADING:
			return {
				...state,
				loading: true
			};
		case SET_GRID_SIZE:
			return {
				...state,
				dimensions: action.payload
			};
		default:
			return state;
	}
}
