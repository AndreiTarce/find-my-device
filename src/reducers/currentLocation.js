const currentLocationReducer = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_CURRENT_LOCATION":
            return {
                time: action.payload.time,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            };
        default:
            return state;
    }
};

export default currentLocationReducer;
