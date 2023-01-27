import "./Trip.css";
import { Card, Row, Col, Button, Container, Form } from "react-bootstrap";
import { addCurrentTripHistoryInfo, setMapActive } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, where, doc, deleteDoc, getDocs } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContextProvider";
import { Timestamp } from "firebase/firestore";
import DeleteTripModal from "./DeleteTripModal";
import { useState, useMemo, useRef, useEffect } from "react";
import deleteIcon from "../../assets/deleteIcon.svg";
import useDebounce from "../useDebounce";
import updateTripName from "./updateTripInfo";
import { motion, AnimatePresence } from "framer-motion";

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
        const q = query(
            collection(db, `users/${user.uid}/trips`),
            where("startTime", "==", Timestamp.fromDate(trip.startTime))
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        setdeleteTripModalShow(false);
        if (currentTripHistoryInfo.startTime === trip.startTime) {
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
        <motion.div transition={{ duration: 0.6 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="card trip-card">
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
                    <p className="card-text">
                        <div className="d-flex flex-column">
                            <div className="start-time-section d-flex flex-row justify-content-between mb-3">
                                <div className="start-time-date-section d-flex flex-column align-self-end">
                                    <span className="trip-history-date-header">Start time</span>
                                    <p>
                                        <span className="trip-history-date">
                                            {trip.startTime.getDay()}{" "}
                                            {trip.startTime.toLocaleString("en-US", {
                                                month: "short",
                                            })}{" "}
                                            {trip.startTime.getFullYear()}
                                        </span>
                                    </p>
                                </div>
                                <div className="trip-history-time align-self-end">
                                    {trip.startTime.getHours()}:
                                    {(trip.startTime.getMinutes() < 10 ? "0" : "") + trip.startTime.getMinutes()}:
                                    {(trip.startTime.getSeconds() < 10 ? "0" : "") + trip.startTime.getSeconds()}
                                </div>
                            </div>
                            <div className="end-time-section d-flex flex-row justify-content-between mb-5">
                                <div className="end-time-date-section d-flex flex-column align-self-end">
                                    <span className="trip-history-date-header">End time</span>
                                    <p>
                                        <span className="trip-history-date">
                                            {trip.endTime.getDay()}{" "}
                                            {trip.endTime.toLocaleString("en-US", {
                                                month: "short",
                                            })}{" "}
                                            {trip.endTime.getFullYear()}
                                        </span>
                                    </p>
                                </div>
                                <span className="trip-history-time align-self-end">
                                    {trip.endTime.getHours()}:
                                    {(trip.endTime.getMinutes() < 10 ? "0" : "") + trip.endTime.getMinutes()}:
                                    {(trip.endTime.getSeconds() < 10 ? "0" : "") + trip.endTime.getSeconds()}
                                </span>
                            </div>
                        </div>
                        <div className="buttons-area d-flex justify-content-between align-items-center">
                            <div>
                                <Button onClick={loadTrip}>Load trip</Button>
                            </div>

                            <img
                                src={deleteIcon}
                                height={35}
                                onClick={() => setdeleteTripModalShow(true)}
                                className="hover"
                            />
                            <DeleteTripModal
                                show={deleteTripModalShow}
                                onHide={() => setdeleteTripModalShow(false)}
                                onConfirm={deleteTrip}
                            />
                        </div>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Trip;
