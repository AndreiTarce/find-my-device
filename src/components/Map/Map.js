import { db } from "../../utils/firebase";
import { onSnapshot, query, doc } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import RenderMapMarker from "./RenderMapMarker";
import { addSensorData } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { motion } from "framer-motion";

// TODO: convert to react firebase hooks

const Map = () => {
    const currentLocation = useSelector((state) => state.currentLocation);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch();
    const center = useMemo(() => ({ lat: latitude, lng: longitude }));
    const mapTheme = useSelector((state) => state.mapTheme);
    const [clientLocation, setClientLocation] = useState(null);

    function componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                setClientLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });
        }
    }

    const addDateSenzor = (data) => {
        dispatch(addSensorData(data));
        setLatitude(data.latitude);
        setLongitude(data.longitude);
    };

    //real-time sensor data fetching

    useEffect(() => {
        const q = query(doc(db, "date_senzor/current_location"));
        onSnapshot(
            q,
            (querySnapshot) => {
                addDateSenzor(querySnapshot.data());
                dispatch({
                    type: "UPDATE_CURRENT_LOCATION",
                    payload: querySnapshot.data(),
                });
            },
            (error) => {
                console.log(error);
            }
        );
        componentDidMount();
    }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const options = useMemo(() => ({
        mapId: mapTheme,
    }));

    //rendering below
    if (!isLoaded) return <LoaderSpinner />;

    if (isLoaded)
        return (
            <motion.div
                id="dashboard-map"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <GoogleMap
                    zoom={15}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    key={mapTheme}
                >
                    <RenderMapMarker
                        dateSenzor={[clientLocation]}
                        theme={mapTheme}
                    />
                    <RenderMapMarker
                        dateSenzor={[currentLocation]}
                        theme={mapTheme}
                    />
                </GoogleMap>
            </motion.div>
        );
};

export default Map;
