import axios from "axios";
import {
	ADD_SHAPE,
	UPDATE_SHAPES,
	SET_SHAPE_COLOR,
	ADD_BOTTOM_TEXT,
	UPDATE_BOTTOM_TEXT,
	SELECT_BOTTOM_TEXT,
	ADD_BOTTOM_IMAGE,
	UPDATE_BOTTOM_IMAGES,
	SELECT_BOTTOM_IMAGE
} from "../actions/types";

const initialState = {
	counter: 0,
	images: [],
	text: [],
	shapes: [],
	selectedItem: "",
	shape: {
		hex: "#333fb4",
		red: 51,
		green: 63,
		blue: 180
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
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
				shapes: [
					...state.shapes,
					{
						x: 10,
						y: 10,
						width: 100,
						height: 100,

						src: action.src,
						id: id
					}
				]
			};
		/*counter: count + 1,
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
				]*/

		case UPDATE_SHAPES:
			return {
				...state,
				shapes: action.items
			};
		case ADD_BOTTOM_TEXT:
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
		case UPDATE_BOTTOM_TEXT:
			return {
				...state,
				text: action.items
			};
		case SELECT_BOTTOM_TEXT:
			return {
				...state,
				selectedItem: action.id
			};
		case ADD_BOTTOM_IMAGE:
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
		case UPDATE_BOTTOM_IMAGES:
			return {
				...state,
				images: action.items
			};
		case SELECT_BOTTOM_IMAGE:
			return {
				...state,
				selectedItem: action.id
			};

		default:
			return state;
	}
}
