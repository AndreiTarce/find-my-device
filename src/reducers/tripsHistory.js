const tripsHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TRIP":
            return [
                ...state,
                {
                    startTime: action.payload.startTime.toDate(),
                    endTime: action.payload.endTime.toDate(),
                    name: action.payload.name,
                    distanceCovered: action.payload.distanceCovered,
                },
            ];
        case "SORT_TRIPS":
            const trips = [...state];
            trips.sort((a, b) => b.startTime - a.startTime);
            return trips;
        case "DELETE_TRIP":
            const trips2 = [...state];
            const itemToDeleteStartTime = action.payload.itemToDeleteStartTime;
            let indexToDelete;
            trips2.forEach((trip, index) => {
                if (trip.startTime.toString() == itemToDeleteStartTime.toString()) {
                    indexToDelete = index;
                }
            });
            trips2.splice(indexToDelete, 1);
            trips2.sort((a, b) => b.startTime - a.startTime);
            return trips2;
        case "CHANGE_TRIP_NAME":
            const trips3 = [...state];
            trips3.forEach((trip) => {
                if (trip.startTime.toString() == action.payload.startTime.toString()) {
                    trip.name = action.payload.newTripName;
                }
            });
            return trips3;
        default:
            return state;
    }
};

export default tripsHistoryReducer;
