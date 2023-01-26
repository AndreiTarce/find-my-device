import { UserAuth } from "../../context/AuthContextProvider";
import { Card, Button, Image, Container } from "react-bootstrap";
import LoginButton from "../LoginButton";
import { deleteTrips } from "../../api";
import { db } from "../../utils/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { onSnapshot } from "firebase/firestore";
import DeleteDataModal from "../../pages/account/DeleteDataModal";

const ProfileCard = () => {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    const getTripsCount = async () => {
        const coll = collection(db, `users/${user.uid}/trips`);
        onSnapshot(
            coll,
            (querySnapshot) => {
                setCount(querySnapshot.docs.length);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    useEffect(() => {
        getTripsCount();
    }, [loading]);

    let image;
    if (user) {
        image = user.photoURL;
    }
    if (loading) return <LoaderSpinner />;
    if (image)
        return (
            <Container>
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
                                <strong>Trips recorded: {count}</strong>
                            </Card.Subtitle>
                        </Card.Text>
                        <Card.Link>
                            <DeleteDataModal userId={user.uid} />
                        </Card.Link>
                        <Card.Link href="#">
                            <LoginButton />
                        </Card.Link>
                    </Card.Body>
                </Card>
            </Container>
        );
};

export default ProfileCard;
