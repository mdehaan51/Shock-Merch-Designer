import axios from "axios";
import {
	ADD_TEXT,
	UPDATE_SIDE_TEXT,
	SELECT_TEXT,
	SAVE_IMAGE,
	UPDATE_IMAGES,
	SELECT_ITEM
} from "../actions/types";

const initialState = {
	counter: 0,
	images: [],
	text: [],
	selectedItem: ""
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TEXT:
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
			return {
				...state,
				text: action.items
			};
		case SELECT_ITEM:
			return {
				...state,
				selectedItem: action.id
			};
		case SAVE_IMAGE:
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
		case UPDATE_IMAGES:
			return {
				...state,
				images: action.items
			};

		default:
			return state;
	}
}
