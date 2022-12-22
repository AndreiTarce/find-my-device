import { UserAuth } from "../../context/AuthContextProvider";
import { Card, Button, Image } from "react-bootstrap";
import LoginButton from "../LoginButton";
import { deleteTrips } from "../../api";

const ProfileCard = () => {
    const { user } = UserAuth();
    let image;
    if (user) {
        image = user.photoURL;
    }
    if (image)
        return (
            <Card className="text-center" style={{ marginTop: "2rem" }}>
                <Card.Header as="h2">Your account</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Image
                            className="m-2"
                            roundedCircle
                            referrerPolicy="no-referrer"
                            src={image.replace("s96-c", "s400-c")}
                            height={200}
                            width={200}
                        />
                        <Card.Title as="h3">{user.displayName}</Card.Title>
                        <Card.Subtitle className="m-2 text-muted">
                            Account created at: {user.metadata.creationTime}
                        </Card.Subtitle>
                        <Card.Subtitle className="m-2 text-muted">
                            Last sign in: {user.metadata.lastSignInTime}
                        </Card.Subtitle>
                        <Card.Subtitle className="m-2 text-muted">
                            <strong>Trips recorded: {user.metadata.lastSignInTime}</strong>
                        </Card.Subtitle>
                    </Card.Text>
                    <Card.Link>
                        <Button
                            variant="danger"
                            onClick={() => {
                                deleteTrips(user.uid);
                            }}
                        >
                            Delete my data
                        </Button>
                    </Card.Link>
                    <Card.Link href="#">
                        <LoginButton />
                    </Card.Link>
                </Card.Body>
            </Card>
        );
};

export default ProfileCard;
