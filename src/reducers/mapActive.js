const mapActiveReducer = (state = false, action) => {
    switch (action.type) {
        case "SET_MAP_ACTIVE":
            return true;
        case "SET_MAP_INACTIVE":
            return false;
        default:
            return state;
    }
};

export default mapActiveReducer;
