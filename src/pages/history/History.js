import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTripToHistory, sortTripsHistory } from "../../actions";
import Trip from "../../components/TripsHistory/Trip";
import TripsHistoryMap from "../../components/TripsHistory/TripsHistoryMap";

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

    if (loading) {
        return <h1>loading firebase data...</h1>;
    }

    return (
        <>
            <Navbar />
            <h1>Your trip history here</h1>
            {mapActive ? <TripsHistoryMap /> : <p>inactive</p>}
            {trips.length > 0 ? (
                trips.map((trip, index) => <Trip trip={trip} key={index} />)
            ) : (
                <h1>no answers yet :(</h1>
            )}
        </>
    );
};

export default History;
