import routeRecordingReducer from "./routeRecording";
import { combineReducers } from "redux";
import sensorDataStateReducer from "./sensorDataState";
import tripsHistoryReducer from "./tripsHistory";
import currentTripHistoryInfoReducer from "./currentTripHistoryInfo";
import mapActiveReducer from "./mapActive";
import currentLocationReducer from "./currentLocation";
import recordingNotificationReducer from "./recordingNotification";

const rootReducer = combineReducers({
    routeRecording: routeRecordingReducer,
    sensorData: sensorDataStateReducer,
    tripsHistory: tripsHistoryReducer,
    currentTripHistoryInfo: currentTripHistoryInfoReducer,
    mapActive: mapActiveReducer,
    currentLocation: currentLocationReducer,
    recordingNotification: recordingNotificationReducer,
});

export default rootReducer;
