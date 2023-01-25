export const LIGHT = "a1c984e18919c1dc";
export const DARK = "620c9fd13da1eac3";

const mapThemeTogglerReducer = (state = LIGHT, action) => {
    switch (action.type) {
        case "SET_MAP_LIGHT":
            localStorage.setItem("mapTheme", LIGHT);
            return LIGHT;
        case "SET_MAP_DARK":
            localStorage.setItem("mapTheme", DARK);
            return DARK;
        default:
            return localStorage.getItem("mapTheme");
    }
};

export default mapThemeTogglerReducer;
