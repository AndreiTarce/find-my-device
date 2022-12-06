const currentTripHistoryInfoReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CURRENT_TRIP_HISTORY":
            return [{ startTime: action.payload.startTime, endTime: action.payload.endTime }];
        default:
            return state;
    }
};

export default currentTripHistoryInfoReducer;
