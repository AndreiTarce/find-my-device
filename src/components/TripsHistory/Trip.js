import "./Trip.css";
import { Card, Row, Col, Button } from "react-bootstrap";
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
        <Row xs={1} md={1} className="g-4 p-0">
            <Col className="p-0">
                <Card bg="light">
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
                </Card>
            </Col>
        </Row>
    );
};

export default Trip;
