const sensorDataStateReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_SENSOR_DATA":
            return [
                ...state,
                { time: action.payload.time, latitude: action.payload.latitude, longitude: action.payload.longitude },
            ];
        case "SORT_SENSOR_DATA":
            const data = [...state];
            const sortedData = data.sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));
            return sortedData;
        default:
            return state;
    }
};

export default sensorDataStateReducer;
