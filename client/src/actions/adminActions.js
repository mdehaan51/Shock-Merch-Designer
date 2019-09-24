import axios from "axios";
import { GET_ALL_USERS } from "./types";

export const getAllUsers = () => dispatch => {
	axios.get("/api/users/users").then(response => {
		dispatch(setAllUsers(response.data));
	});
};

export const setAllUsers = users => {
	return {
		type: GET_ALL_USERS,
		payload: users
	};
};
