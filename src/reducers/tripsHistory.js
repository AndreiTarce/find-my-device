const tripsHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TRIP":
            return [
                ...state,
                { startTime: action.payload.startTime.toDate(), endTime: action.payload.endTime.toDate() },
            ];
        default:
            return state;
    }
};

export default tripsHistoryReducer;
