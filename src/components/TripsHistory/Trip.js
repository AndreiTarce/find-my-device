import "./Trip.css";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { addCurrentTripHistoryInfo, setMapActive } from "../../actions";
import { useDispatch } from "react-redux";
import TripCard from "./TripCard";

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
                    <TripCard />
                    {/* <Card bg="light">
                    <Card.Body>
                    <Card.Title>Trip name</Card.Title>
                    <Card.Text>
                    This is a longer card with supporting text below as a natural lead-in to additional content.
                    This content is a little bit longer.
                    </Card.Text>
                    <p>
                    <strong>Start time:</strong>
                            {trip.startTime.toString()}
                            </p>
                            <p>
                            <strong>End time:</strong>
                            {trip.endTime.toString()}
                            </p>
                            <Button onClick={buttonClickHandler}>Load trip</Button>
                            </Card.Body>
                        </Card> */}
                </Col>
            </Row>
        </Container>
    );
};

export default Trip;
