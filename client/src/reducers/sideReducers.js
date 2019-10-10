import axios from "axios";
import {
	ADD_SIDE_TEXT,
	UPDATE_SIDE_TEXT,
	SELECT_SIDE_TEXT,
	ADD_SIDE_IMAGE,
	UPDATE_SIDE_IMAGES,
	SELECT_SIDE_IMAGE
} from "../actions/types";

const initialState = {
	counter: 0,
	images: [],
	text: [],
	selectedItem: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_SIDE_TEXT:
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
		case UPDATE_SIDE_TEXT:
			console.log("reaching reducer");
			console.log(action.items);
			return {
				...state,
				text: action.items
			};
		case SELECT_SIDE_TEXT:
			return {
				...state,
				selectedItem: action.id
			};
		case ADD_SIDE_IMAGE:
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
		case UPDATE_SIDE_IMAGES:
			return {
				...state,
				images: action.items
			};
		case SELECT_SIDE_IMAGE:
			return {
				...state,
				selectedItem: action.id
			};

		default:
			return state;
	}
}
