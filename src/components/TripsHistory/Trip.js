import "./Trip.css";
import { Button, Form } from "react-bootstrap";
import { addCurrentTripHistoryInfo, setMapActive } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import { collection, query, where, deleteDoc, getDocs } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContextProvider";
import DeleteTripModal from "./DeleteTripModal";
import { useState, useEffect } from "react";
import useDebounce from "../useDebounce";
import updateTripName from "./updateTripInfo";
import { motion } from "framer-motion";

// ! fix loading issue (save trip and quickly navigate to history tab, probably tripDistance not calculated yet)
// * fixed

const Trip = ({ trip }) => {
    const dispatch = useDispatch();
    const { user } = UserAuth();

    const [deleteTripModalShow, setdeleteTripModalShow] = useState(false);
    const [tripValueName, setTripValueName] = useState(trip.name);
    const debouncedValue = useDebounce(tripValueName, 1000);
    const [firstLoad, setFirstLoad] = useState(true);
    const currentTripHistoryInfo = useSelector((state) => state.currentTripHistoryInfo);

    const loadTrip = async () => {
        await dispatch({ type: "SET_MAP_INACTIVE" });
        await dispatch(addCurrentTripHistoryInfo(trip));
        await dispatch(setMapActive());
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const deleteTrip = async () => {
        const q = query(collection(db, `users/${user.uid}/trips`), where("startTime", "==", trip.startTime));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        setdeleteTripModalShow(false);
        if (currentTripHistoryInfo.startTime.toString() === trip.startTime.toDate().toString()) {
            await dispatch({ type: "SET_MAP_INACTIVE" });
        }
    };

    const changeHandler = (event) => {
        setTripValueName(event.target.value);
        setFirstLoad(false);
    };

    useEffect(() => {
        if (!firstLoad) {
            const newTripObject = {
                ...trip,
                newTripName: tripValueName,
            };
            dispatch({ type: "CHANGE_TRIP_NAME", payload: newTripObject });
            updateTripName(newTripObject, user.uid);
        }
    }, [debouncedValue]);

    return (
        <motion.div
            transition={{ duration: 0.15 }}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="card trip-card bg">
                <div className="card-body p-4">
                    <h1>
                        <Form.Control
                            type="text"
                            size="lg"
                            placeholder={tripValueName}
                            onChange={changeHandler}
                            value={tripValueName}
                            className="trip-history-name"
                            plaintext
                        />
                    </h1>
                    <div className="d-flex flex-column">
                        <div className="start-time-section d-flex flex-row justify-content-between mb-3">
                            <div className="start-time-date-section d-flex flex-column align-self-end">
                                <span className="trip-history-date-header">Start time</span>
                                <p>
                                    <span className="trip-history-date">
                                        {trip.startTime.toDate().getDate()}{" "}
                                        {trip.startTime.toDate().toLocaleString("en-US", {
                                            month: "short",
                                        })}{" "}
                                        {trip.startTime.toDate().getFullYear()}
                                    </span>
                                </p>
                            </div>
                            <div className="trip-history-time align-self-end">
                                {trip.startTime.toDate().getHours()}:
                                {(trip.startTime.toDate().getMinutes() < 10 ? "0" : "") +
                                    trip.startTime.toDate().getMinutes()}
                                :
                                {(trip.startTime.toDate().getSeconds() < 10 ? "0" : "") +
                                    trip.startTime.toDate().getSeconds()}
                            </div>
                        </div>
                        <div className="end-time-section d-flex flex-row justify-content-between mb-5">
                            <div className="end-time-date-section d-flex flex-column align-self-end">
                                <span className="trip-history-date-header">End time</span>
                                <p>
                                    <span className="trip-history-date">
                                        {trip.endTime.toDate().getDate()}{" "}
                                        {trip.endTime.toDate().toLocaleString("en-US", {
                                            month: "short",
                                        })}{" "}
                                        {trip.endTime.toDate().getFullYear()}
                                    </span>
                                </p>
                            </div>
                            <span className="trip-history-time align-self-end">
                                {trip.endTime.toDate().getHours()}:
                                {(trip.endTime.toDate().getMinutes() < 10 ? "0" : "") +
                                    trip.endTime.toDate().getMinutes()}
                                :
                                {(trip.endTime.toDate().getSeconds() < 10 ? "0" : "") +
                                    trip.endTime.toDate().getSeconds()}
                            </span>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-2">
                            <p>
                                <span className="trip-history-date-header">Distance covered</span>
                            </p>
                            <p>
                                <span className="trip-history-distance">
                                    {trip.distanceCovered?.toFixed(2) || "0.00"}km
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="buttons-area d-flex justify-content-between align-items-center">
                        <div>
                            <Button className="rounded-btn" onClick={loadTrip}>
                                Load trip
                            </Button>
                        </div>

                        <button className="noselect delete-button" onClick={() => setdeleteTripModalShow(true)}>
                            <span className="text">Delete</span>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                </svg>
                            </span>
                        </button>
                        <DeleteTripModal
                            show={deleteTripModalShow}
                            onHide={() => setdeleteTripModalShow(false)}
                            onConfirm={deleteTrip}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Trip;
