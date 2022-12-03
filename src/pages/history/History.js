import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTripToHistory } from "../../actions";

const History = () => {
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const trips = useSelector((state) => state.tripsHistory);

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
            {trips.length > 0 ? (
                trips.map((trip, index) => (
                    <div key={index}>
                        <h2>Trip {index}</h2>
                        <p>{trip.startTime.toString()}</p>
                        <p>{trip.endTime.toString()}</p>
                    </div>
                ))
            ) : (
                <h1>no answers yet :(</h1>
            )}
        </>
    );
};

export default History;
