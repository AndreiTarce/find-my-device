import "./Trip.css";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { addCurrentTripHistoryInfo, setMapActive } from "../../actions";
import { useDispatch } from "react-redux";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, where, doc, deleteDoc, getDocs } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContextProvider";
import { Timestamp } from "firebase/firestore";
import DeleteTripModal from "./DeleteTripModal";
import { useState } from "react";

const Trip = ({ trip }) => {
    const dispatch = useDispatch();
    const { user } = UserAuth();

    const [deleteTripModalShow, setdeleteTripModalShow] = useState(false);

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
        console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
            console.log(doc.ref);
            await deleteDoc(doc.ref);
            dispatch({ type: "DELETE_TRIP", payload: { itemToDeleteStartTime: doc.data().startTime.toDate() } });
        });
        setdeleteTripModalShow(false);
    };

    return (
        <Container fluid>
            <Row xs={1} md={1} className="g-4">
                <Col>
                    <div className="trip-history-card">
                        <div className="trip-history-card-grid">
                            <div className="trip-history-card-header">
                                <h2>Trip name</h2>
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
                                            <Button onClick={loadTrip}>Load trip</Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    setdeleteTripModalShow(true);
                                                }}
                                            >
                                                Delete trip
                                            </Button>
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
