import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect, useState } from "react";
import RenderMapMarker from "../Map/RenderMapMarker";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const TripsHistoryMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const options = useMemo(() => ({ mapId: "a1c984e18919c1dc" }));

    const [dateSenzor, setDateSenzor] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentTripHistoryInfo = useState(useSelector((state) => state.currentTripHistoryInfo));
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        const q = query(
            collection(db, "date_senzor"),
            where("time", ">=", Timestamp.fromDate(currentTripHistoryInfo.startTime)),
            where("time", "<=", Timestamp.fromDate(currentTripHistoryInfo.endTime))
        );

        onSnapshot(
            q,
            (querySnapshot) => {
                const docs = querySnapshot.docs;
                docs.forEach((doc) => {
                    setDateSenzor((oldDateSenzor) => [
                        ...oldDateSenzor,
                        { latitude: doc.data().latitude, longitude: doc.data().longitude },
                    ]);
                    setLatitude(doc.data().latitude);
                    setLongitude(doc.data().longitude);
                });
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [loading]);

    //rendering below
    if (!isLoaded) return <LoaderSpinner />;
    if (loading) return <LoaderSpinner />;

    return (
        <div id="trip-history-map-wrapper">
            <div id="trip-history-map-container">
                <GoogleMap
                    zoom={10}
                    center={{
                        lat: latitude,
                        lng: longitude,
                    }}
                    mapContainerClassName="map-container"
                    options={options}
                >
                    <RenderMapMarker dateSenzor={dateSenzor} />
                </GoogleMap>
            </div>
        </div>
    );
};

export default TripsHistoryMap;
