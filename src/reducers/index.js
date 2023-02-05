import routeRecordingReducer from "./routeRecording";
import { combineReducers } from "redux";
import sensorDataStateReducer from "./sensorDataState";
import tripsHistoryReducer from "./tripsHistory";
import currentTripHistoryInfoReducer from "./currentTripHistoryInfo";
import mapActiveReducer from "./mapActive";
import currentLocationReducer from "./currentLocation";
import mapThemeTogglerReducer from "./mapThemeToggler";

const rootReducer = combineReducers({
    routeRecording: routeRecordingReducer,
    sensorData: sensorDataStateReducer,
    tripsHistory: tripsHistoryReducer,
    currentTripHistoryInfo: currentTripHistoryInfoReducer,
    mapActive: mapActiveReducer,
    currentLocation: currentLocationReducer,
    mapTheme: mapThemeTogglerReducer,
});

export default rootReducer;
