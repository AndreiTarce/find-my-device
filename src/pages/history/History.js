import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTripToHistory, sortTripsHistory, deleteTripFromHistory } from "../../actions";
import Trip from "../../components/TripsHistory/Trip";
import TripsHistoryMap from "../../components/TripsHistory/TripsHistoryMap";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { Container } from "react-bootstrap";
import DeleteTripModal from "../../components/TripsHistory/DeleteTripModal";
import "./History.css";
import { motion, AnimatePresence } from "framer-motion";

const History = () => {
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const trips = useSelector((state) => state.tripsHistory);
    const mapActive = useSelector((state) => state.mapActive);

    useEffect(() => {
        const tripsRef = collection(db, `users/${user.uid}/trips`);
        const tripsQuery = query(tripsRef);
        onSnapshot(
            tripsQuery,
            (querySnapshot) => {
                const changes = querySnapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === "added") {
                        dispatch(addTripToHistory(change.doc.data()));
                        console.log(change.doc.data());
                        dispatch(sortTripsHistory());
                    } else if (change.type === "removed") {
                        dispatch(deleteTripFromHistory(change.doc.data().startTime.toDate()));
                    }
                });
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [loading]);

    if (loading) {
        return <LoaderSpinner />;
    }

    return (
        <>
            <Navbar />
            {mapActive && <TripsHistoryMap />}
            <DeleteTripModal />
            <Container className="trip-history-header">
                <h1>Trip history</h1>
                <div className="divider"></div>
            </Container>
            {trips.length > 0 && trips.map((trip) => <Trip trip={trip} key={trip.startTime} />)}
            {trips.length <= 0 && (
                <Container>
                    <h2>You haven't recorded any trips yet.</h2>
                </Container>
            )}
        </>
    );
};

export default History;
