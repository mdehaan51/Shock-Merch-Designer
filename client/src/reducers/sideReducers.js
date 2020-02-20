
import {
	ADD_SIDE_TEXT,
	UPDATE_SIDE_TEXT,
	SELECT_SIDE_TEXT,
	ADD_SIDE_IMAGE,
	UPDATE_SIDE_IMAGES,
	SELECT_SIDE_IMAGE,
	COPY_SIDE_IMAGE,
	DELETE_SIDE_IMAGE
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
		case COPY_SIDE_IMAGE:
			let number2 = state.counter;
			let imageId2 = `image${number2}`;
			return {
				...state,
				counter: number2 + 1,
				images: [
					...state.images,
					{
						id: imageId2,
						src: action.payload.src
					}
				]
			};
		case SELECT_SIDE_IMAGE:
			return {
				...state,
				selectedItem: action.id
			};

		case DELETE_SIDE_IMAGE:
			return {
				...state,
				images: action.payload
			};

		default:
			return state;
	}
}
