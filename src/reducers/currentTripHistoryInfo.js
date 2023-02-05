const currentTripHistoryInfoReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CURRENT_TRIP_HISTORY":
            return { startTime: action.payload.startTime.toDate(), endTime: action.payload.endTime.toDate() };
        default:
            return state;
    }
};

export default currentTripHistoryInfoReducer;
