import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect, useState } from "react";
import RenderMapMarker from "../Map/RenderMapMarker";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { Container } from "react-bootstrap";

const TripsHistoryMap = () => {
    const mapTheme = useSelector((state) => state.mapTheme);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const options = useMemo(() => ({ mapId: mapTheme }));

    const [dateSenzor, setDateSenzor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTripHistoryInfo, setCurrentTripHistoryInfo] = useState(
        useSelector((state) => state.currentTripHistoryInfo)
    );
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const center = useMemo(() => ({ lat: latitude, lng: longitude }));

    useEffect(() => {
        const q = query(
            collection(db, "date_senzor"),
            where("time", ">=", Timestamp.fromDate(currentTripHistoryInfo.startTime)),
            where("time", "<=", Timestamp.fromDate(currentTripHistoryInfo.endTime))
        );

        onSnapshot(
            q,
            (querySnapshot) => {
                setDateSenzor([]);
                const docs = querySnapshot.docs;
                docs.forEach((doc) => {
                    setDateSenzor((oldDateSenzor) => [
                        ...oldDateSenzor,
                        { latitude: doc.data().latitude, longitude: doc.data().longitude },
                    ]);
                    setLatitude(doc.data().latitude);
                    setLongitude(doc.data().longitude);
                });
                console.log(dateSenzor);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [loading, currentTripHistoryInfo]);

    //rendering below
    if (!isLoaded) return <LoaderSpinner />;
    if (loading) return <LoaderSpinner />;

    return (
        <>
            <div id="trip-history-map-wrapper" key={mapTheme}>
                <div id="trip-history-map-container">
                    <Container>
                        <h2>Selected trip map</h2>
                    </Container>
                    <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" options={options}>
                        <RenderMapMarker dateSenzor={dateSenzor} theme={mapTheme} />
                    </GoogleMap>
                </div>
            </div>
        </>
    );
};

export default TripsHistoryMap;
