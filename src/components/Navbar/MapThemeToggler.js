import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./MapThemeToggler.module.css";
import { LIGHT, DARK } from "../../reducers/mapThemeToggler";

const MapThemeToggler = () => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);

    const changeHandler = (e) => {
        if (e.target.checked) {
            dispatch({ type: "SET_MAP_DARK" });
            setIsChecked(true);
        }
        if (!e.target.checked) {
            dispatch({ type: "SET_MAP_LIGHT" });
            setIsChecked(false);
        }
    };

    useEffect(() => {
        const localStorageMapSetting = localStorage.getItem("mapTheme");
        if (localStorageMapSetting === DARK) {
            dispatch({ type: "SET_MAP_DARK" });
            setIsChecked(true);
        }
    }, []);

    return (
        <div
            className="d-flex flex-column align-items-center px-2 pt-2"
            id={styles.container}
        >
            <p>
                Current map theme:{" "}
                <strong>{isChecked ? "DARK" : "LIGHT"}</strong>
            </p>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    onChange={changeHandler}
                    checked={isChecked}
                />
                <span className={styles.slider}></span>
            </label>
        </div>
    );
};

export default MapThemeToggler;
