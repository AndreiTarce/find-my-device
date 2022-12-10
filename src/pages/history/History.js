import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTripToHistory, sortTripsHistory } from "../../actions";
import Trip from "../../components/TripsHistory/Trip";
import TripsHistoryMap from "../../components/TripsHistory/TripsHistoryMap";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { Container } from "react-bootstrap";
import DeleteTripModal from "../../components/TripsHistory/DeleteTripModal";

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
                        dispatch(sortTripsHistory());
                    } else if (change.type === "removed") {
                        console.log("removed");
                    }
                });
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [loading]);

    useEffect(() => {
        var docWidth = document.documentElement.offsetWidth;
        [].forEach.call(document.querySelectorAll("*"), function (el) {
            if (el.offsetWidth > docWidth) {
                console.log(el);
                console.log(1);
            }
        });
    }, []);

    if (loading) {
        return <LoaderSpinner />;
    }

    return (
        <>
            <Navbar />
            {mapActive && <TripsHistoryMap />}
            <DeleteTripModal />
            <Container>
                <h1>Your trip history here</h1>
            </Container>
            {trips.length > 0 ? (
                trips.map((trip, index) => <Trip trip={trip} key={index} />)
            ) : (
                <h1>no answers yet :(</h1>
            )}
        </>
    );
};

export default History;
