import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import designReducer from "./designReducers";
import adminReducer from "./adminReducers";
import drawingReducer from "./drawingReducers";
import sideReducer from "./sideReducers";
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	design: designReducer,
	admin: adminReducer,
	drawing: drawingReducer,
	side: sideReducer
});
