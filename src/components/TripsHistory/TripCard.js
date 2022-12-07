import "./TripCard.css";
import { Container, Row, Col } from "react-bootstrap";

const TripCard = () => {
    return (
        <div className="trip-history-card">
            <div className="trip-history-card-grid">
                <div className="trip-history-card-header">
                    <h2>Trip name</h2>
                </div>
                <Container fluid>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default TripCard;
