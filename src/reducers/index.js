import routeRecordingReducer from "./routeRecording";
import { combineReducers } from "redux";
import sensorDataStateReducer from "./sensorDataState";
import tripsHistoryReducer from "./tripsHistory";
import currentTripHistoryInfoReducer from "./currentTripHistoryInfo";
import mapActiveReducer from "./mapActive";

const rootReducer = combineReducers({
    routeRecording: routeRecordingReducer,
    sensorData: sensorDataStateReducer,
    tripsHistory: tripsHistoryReducer,
    currentTripHistoryInfo: currentTripHistoryInfoReducer,
    mapActive: mapActiveReducer,
});

export default rootReducer;
