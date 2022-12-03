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
