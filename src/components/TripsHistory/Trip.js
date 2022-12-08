import "./Trip.css";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { addCurrentTripHistoryInfo, setMapActive } from "../../actions";
import { useDispatch } from "react-redux";

const Trip = ({ trip }) => {
    const dispatch = useDispatch();
    const buttonClickHandler = () => {
        dispatch(addCurrentTripHistoryInfo(trip));
        dispatch(setMapActive());
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
                                            <Button onClick={buttonClickHandler}>Load trip</Button>
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
