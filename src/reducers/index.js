import routeRecordingReducer from "./routeRecording";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    routeRecording: routeRecordingReducer,
});

export default rootReducer;
