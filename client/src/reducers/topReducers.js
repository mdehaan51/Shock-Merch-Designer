import axios from "axios";
import {
	ADD_TOP_TEXT,
	UPDATE_TOP_TEXT,
	SELECT_TOP_TEXT,
	ADD_TOP_IMAGE,
	UPDATE_TOP_IMAGES,
	SELECT_TOP_IMAGE
} from "../actions/types";

const initialState = {
	counter: 0,
	images: [],
	text: [],
	selectedItem: ""
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TOP_TEXT:
			let num = state.counter;
			let pieceId = `${action.id}${num}`;
			return {
				...state,
				counter: num + 1,
				text: [
					...state.text,
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
		case UPDATE_TOP_TEXT:
			return {
				...state,
				text: action.items
			};
		case SELECT_TOP_TEXT:
			return {
				...state,
				selectedItem: action.id
			};
		case ADD_TOP_IMAGE:
			let number = state.counter;
			let imageId = `${action.id}${number}`;
			return {
				...state,
				counter: number + 1,
				images: [
					...state.images,
					{
						id: imageId,
						src: action.payload
					}
				]
			};
		case UPDATE_TOP_IMAGES:
			return {
				...state,
				images: action.items
			};
		case SELECT_TOP_IMAGE:
			return {
				...state,
				selectedItem: action.id
			};

		default:
			return state;
	}
}
