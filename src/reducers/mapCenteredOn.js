const mapCenteredOnReducer = (state = {}, action) => {
    switch (action.type) {
        case "CENTERED_ON_CLIENT":
            return "client";
        case "CENTERED_ON_TRACKER":
            return "tracker";
        case "CENTERED_ON_UNCENTERED":
            return "uncentered";
        default:
            return state;
    }
};

export default mapCenteredOnReducer;
