import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	USER_LOADING,
	SET_CURRENT_ADMIN
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {

	axios
		.post("/api/users/register", userData)
		.then(subscribeUser(userData))
		.then(res => history.push("/")) // re-direct to login on successful register
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const subscribeUser = (userData) => {
	console.log(userData)

	axios.post("/api/mailer/subscribe", userData).then(response => {
		console.log(response)
		if (response.data.msg === "success") {
			alert("User Subscribed.");
			//this.resetForm();
		} else if (response.data.msg === "fail") {
			alert("Subscribe failed.");
		}
})}

// Login - get user token
export const loginUser = userData => dispatch => {
	axios
		.post("/api/users/login", userData)
		.then(res => {
			// Save to localStorage
			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginAdmin = userData => dispatch => {
	axios
		.post("/api/users/admin", userData)
		.then(res => {
			// Save to localStorage
			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			console.log(decoded);
			dispatch(setCurrentAdmin(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const resetPassword = userData => dispatch => {
	axios
		.post("/api/mailer/reset", userData)
		.then(res => {
			dispatch({
				type: GET_ERRORS,
				payload: { success: "Success! Please check your email" }
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const updatePassword = userData => dispatch => {
	axios
		.post("/api/users/updatePassword", userData)
		.then(res => {
			dispatch({
				type: GET_ERRORS,
				payload: { success: "Success! Please check your email" }
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const setCurrentAdmin = decoded => {
	return {
		type: SET_CURRENT_ADMIN,
		payload: decoded
	};
};
// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};
// Log user out
export const logoutUser = history => dispatch => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
