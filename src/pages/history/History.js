import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import Trip from "../../components/TripsHistory/Trip";
import TripsHistoryMap from "../../components/TripsHistory/TripsHistoryMap";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { Container, Dropdown, DropdownButton, Image } from "react-bootstrap";
import DeleteTripModal from "../../components/TripsHistory/DeleteTripModal";
import "./History.css";
import noTripsIllustration from "../../assets/no_trips.svg";
import { useCollection } from "react-firebase-hooks/firestore";
import Error from "../../components/Error/Error";
import { useState } from "react";

//*Converted to react-firebase-hooks

const History = () => {
    const { user } = UserAuth();
    const mapActive = useSelector((state) => state.mapActive);
    const tripsRef = collection(db, `users/${user.uid}/trips`);
    const [sort, setSort] = useState("desc");
    const tripsQuery = query(tripsRef, orderBy("startTime", sort));

    const [snapshot, loading, error] = useCollection(tripsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    if (error)
        return (
            <>
                <Navbar />
                <Error />
            </>
        );

    if (loading)
        return (
            <>
                <Navbar />
                <LoaderSpinner />
            </>
        );

    return (
        <div className="mb-4">
            <Navbar />
            <Container>{mapActive && <TripsHistoryMap />}</Container>
            <DeleteTripModal />
            <Container className="trip-history-header">
                <h1>Trip history</h1>
                <div className="divider mb-4"></div>
                <div className="d-flex justify-content-start mb-4">
                    <DropdownButton title="Sort by">
                        <Dropdown.Item
                            onClick={() => {
                                setSort("desc");
                            }}
                        >
                            Newest
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setSort("asc");
                            }}
                        >
                            Oldest
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            </Container>
            <Container className="d-flex gap-4 flex-wrap">
                {snapshot && snapshot.docs.map((trip) => <Trip trip={trip.data()} key={trip.id} />)}
            </Container>
            {!snapshot.docs.length && (
                <Container className="d-flex flex-column">
                    <h2 className="pb-5">You haven't recorded any trips yet.</h2>
                    <div className="illustration-container">
                        <Image src={noTripsIllustration} id="illustration" />
                    </div>
                </Container>
            )}
        </div>
    );
};

export default History;
