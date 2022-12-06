export const startRecording = () => {
    return {
        type: "START_RECORDING",
    };
};

export const stopRecording = () => {
    return {
        type: "STOP_RECORDING",
    };
};

export const addSensorData = (data) => {
    return {
        type: "ADD_SENSOR_DATA",
        payload: data,
    };
};

export const addTripToHistory = (data) => {
    return {
        type: "ADD_TRIP",
        payload: data,
    };
};

export const sortTripsHistory = () => {
    return {
        type: "SORT_TRIPS",
    };
};

export const addCurrentTripHistoryInfo = (data) => {
    return { type: "ADD_CURRENT_TRIP_HISTORY", payload: data };
};

export const setMapActive = () => {
    return { type: "SET_MAP_ACTIVE" };
};

export const setMapInactive = () => {
    return { type: "SET_MAP_INACTIVE" };
};
