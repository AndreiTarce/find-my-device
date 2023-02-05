import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect, useState } from "react";
import RenderMapMarker from "../Map/RenderMapMarker";
import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

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

    const sensorDataQuery = query(
        collection(db, "date_senzor"),
        where("time", ">=", currentTripHistoryInfo.startTime),
        where("time", "<=", currentTripHistoryInfo.endTime)
    );

    useEffect(() => {
        onSnapshot(
            sensorDataQuery,
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
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [loading, currentTripHistoryInfo]);

    if (isLoaded && !loading)
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
                <div className="mb-5" id="trip-history-map-wrapper" key={mapTheme}>
                    <div id="trip-history-map-container">
                        <Container>
                            <h2>Selected trip map</h2>
                        </Container>
                        <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" options={options}>
                            <RenderMapMarker dateSenzor={dateSenzor} theme={mapTheme} />
                        </GoogleMap>
                    </div>
                </div>
            </motion.div>
        );
};

export default TripsHistoryMap;
