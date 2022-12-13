const recordingNotificationReducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOW_START_RECORDING_NOTIFICATION":
            return { startShow: true, endShow: false };
        case "SHOW_STOP_RECORDING_NOTIFICATION":
            return { startShow: false, endShow: true };
        case "END_NOTIFICATION":
            return { startShow: false, endShow: false };
        default:
            return state;
    }
};

export default recordingNotificationReducer;
