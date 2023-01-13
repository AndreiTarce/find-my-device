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

const Trip = ({ trip }) => {
    const dispatch = useDispatch();
    const { user } = UserAuth();

    const [deleteTripModalShow, setdeleteTripModalShow] = useState(false);
    const [tripValueName, setTripValueName] = useState(trip.name);
    const debouncedValue = useDebounce(tripValueName, 1000);
    const [firstLoad, setFirstLoad] = useState(true);

    const loadTrip = () => {
        dispatch(addCurrentTripHistoryInfo(trip));
        dispatch(setMapActive());
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
        <Container fluid>
            <Row xs={1} md={1} className="g-4">
                <Col>
                    <div className="trip-history-card">
                        <div className="trip-history-card-grid">
                            <div className="trip-history-card-header">
                                {/* <h2>Trip name</h2> */}
                                <h2>
                                    <Form.Control
                                        type="text"
                                        size="lg"
                                        placeholder={tripValueName}
                                        onChange={changeHandler}
                                        value={tripValueName}
                                        className="trip-history-name"
                                        plaintext
                                    />
                                </h2>
                            </div>
                            <div className="trip-history-card-footer flex">
                                <Container fluid className="bottom">
                                    <Row>
                                        <Col>
                                            <div className="trip-history-text-section">
                                                <div className="text-grid">
                                                    <div className="text-section-left-side">
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
                                                    <div className="text-section-rgiht-side">
                                                        <span className="trip-history-time">
                                                            {trip.startTime.getHours()}:
                                                            {(trip.startTime.getMinutes() < 10 ? "0" : "") +
                                                                trip.startTime.getMinutes()}
                                                            :
                                                            {(trip.startTime.getSeconds() < 10 ? "0" : "") +
                                                                trip.startTime.getSeconds()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="trip-history-text-section">
                                                <div className="text-grid">
                                                    <div className="text-section-left-side">
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
                                                    <div className="text-section-rgiht-side">
                                                        <span className="trip-history-time">
                                                            {trip.endTime.getHours()}:
                                                            {(trip.endTime.getMinutes() < 10 ? "0" : "") +
                                                                trip.endTime.getMinutes()}
                                                            :
                                                            {(trip.endTime.getSeconds() < 10 ? "0" : "") +
                                                                trip.endTime.getSeconds()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col>
                                            <Button onClick={loadTrip} size="sm">
                                                Load trip
                                            </Button>
                                            <img
                                                src={deleteIcon}
                                                height={30}
                                                onClick={() => setdeleteTripModalShow(true)}
                                                className="hover"
                                            />
                                            <DeleteTripModal
                                                show={deleteTripModalShow}
                                                onHide={() => setdeleteTripModalShow(false)}
                                                onConfirm={deleteTrip}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Trip;
