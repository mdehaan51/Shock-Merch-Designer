import axios from "axios";
import {
	SET_PRIMARY_SOCK_COLOR,
	SET_SECONDARY_SOCK_COLOR,
	SET_SHAPE_COLOR,
	ADD_SHAPE,
	UPDATE_SHAPES,
	ADD_TEXT,
	UPDATE_SIDE_TEXT,
	SELECT_TEXT,
	SAVE_IMAGE,
	UPDATE_IMAGES
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
		case SET_SHAPE_COLOR:
			return {
				...state,
				shape: {
					hex: action.hex,
					red: action.red,
					blue: action.blue,
					green: action.green
				}
			};
		case ADD_SHAPE:
			let count = state.counter;
			let id = `${action.id}${count}`;

			return {
				...state,
				counter: count + 1,
				inputShapes: [
					...state.inputShapes,
					{
						x: 10,
						y: 10,
						width: 100,
						height: 100,
						rotation: 45.0,
						src: action.src,
						id: id
					}
				]
			};
		case UPDATE_SHAPES:
			return {
				...state,
				inputShapes: action.items
			};
		case ADD_TEXT:
			let num = state.counter;
			let pieceId = `${action.id}${num}`;
			return {
				...state,
				counter: num + 1,
				sideText: [
					...state.sideText,
					{
						text: action.text,
						id: pieceId,
						style: action.style,
						rotation: 45,
						x: 10,
						y: 10,
						width: 100,
						height: 100
					}
				]
			};
		case UPDATE_SIDE_TEXT:
			return {
				...state,
				sideText: action.items
			};
		case SELECT_TEXT:
			return {
				...state,
				selectedText: action.id
			};
		case SAVE_IMAGE:
			let number = state.counter;
			let imageId = `${action.id}${number}`;
			return {
				...state,
				counter: number + 1,
				sideImages: [
					...state.sideImages,
					{
						id: imageId,
						src: action.payload
					}
				]
			};
		case UPDATE_SHAPES:
			return {
				...state,
				sideImages: action.items
			};

		default:
			return state;
	}
}
