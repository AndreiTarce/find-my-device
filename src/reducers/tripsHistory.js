const tripsHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TRIP":
            return [
                ...state,
                { startTime: action.payload.startTime.toDate(), endTime: action.payload.endTime.toDate() },
            ];
        case "SORT_TRIPS":
            const trips = [...state];
            trips.sort((a, b) => b.startTime - a.startTime);
            return trips;
        default:
            return state;
    }
};

export default tripsHistoryReducer;
