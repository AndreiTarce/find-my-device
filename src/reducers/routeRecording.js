const routeRecordingReducer = (state = false, action) => {
    switch (action.type) {
        case "START_RECORDING":
            return true;
        case "STOP_RECORDING":
            return false;
        default:
            return state;
    }
};

export default routeRecordingReducer;
