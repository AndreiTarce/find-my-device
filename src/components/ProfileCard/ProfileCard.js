import { UserAuth } from "../../context/AuthContextProvider";
import { Card, Image, Container } from "react-bootstrap";
import LoginButton from "../LoginButton";
import { db } from "../../utils/firebase";
import { collection } from "firebase/firestore";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import DeleteDataModal from "../../pages/account/DeleteDataModal";
import "./ProfileCard.css";
import { motion } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
import Error from "../Error/Error";

//TODO: convert to react firebase hook

const ProfileCard = () => {
    const { user } = UserAuth();
    const tripsCollection = collection(db, `users/${user.uid}/trips`);

    const [snapshot, loading, error] = useCollection(tripsCollection, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    if (error) return <Error />;

    if (loading) return <LoaderSpinner />;

    if (user && snapshot)
        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <Container>
                    <Card className="text-center account-card" style={{ marginTop: "2rem" }}>
                        <Card.Header as="h2" className="">
                            Your account
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Image
                                    className="m-2"
                                    roundedCircle
                                    referrerPolicy="no-referrer"
                                    src={user.photoURL.replace("s96-c", "s400-c")}
                                    height={200}
                                    width={200}
                                />
                                <Card.Title as="h3">{user.displayName}</Card.Title>
                                <Card.Subtitle className="m-2 text-white">
                                    Account created at: {user.metadata.creationTime}
                                </Card.Subtitle>
                                <Card.Subtitle className="m-2 text-white">
                                    Last sign in: {user.metadata.lastSignInTime}
                                </Card.Subtitle>
                                <Card.Subtitle className="m-2 text-white">
                                    <strong>Trips recorded: {snapshot.docs.length}</strong>
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
            </motion.div>
        );
};

export default ProfileCard;
