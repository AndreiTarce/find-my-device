import routeRecordingReducer from "./routeRecording";
import { combineReducers } from "redux";
import sensorDataStateReducer from "./sensorDataState";
import tripsHistoryReducer from "./tripsHistory";

const rootReducer = combineReducers({
    routeRecording: routeRecordingReducer,
    sensorData: sensorDataStateReducer,
    tripsHistory: tripsHistoryReducer,
});

export default rootReducer;
