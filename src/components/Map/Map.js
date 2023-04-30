import { db } from "../../utils/firebase";
import { onSnapshot, query, doc } from "firebase/firestore";
import { useState, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import RenderMapMarker from "./RenderMapMarker";
import { addSensorData } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { motion } from "framer-motion";
import RenderClientLocation from "./RenderClientLocation";
import { Button } from "react-bootstrap";

// TODO: convert to react firebase hooks

const Map = () => {
    const currentLocation = useSelector((state) => state.currentLocation);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch();
    const centeredOn = useSelector((state) => state.mapCenter);
    const mapTheme = useSelector((state) => state.mapTheme);
    const clientLocation = useRef();
    const memoizedClientLocation = useMemo(
        () => clientLocation,
        [clientLocation]
    );

    const center = useMemo(() => {
        if (centeredOn === "uncentered") {
            return {
                lat: null,
                lng: null,
            };
        }
        if (centeredOn === "tracker" || Object.keys(centeredOn).length === 0) {
            return { lat: latitude, lng: longitude };
        }
        if (centeredOn === "client") {
            return {
                lat: clientLocation.latitude,
                lng: clientLocation.longitude,
            };
        }
    });

    function componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                clientLocation.latitude = position.coords.latitude;
                clientLocation.longitude = position.coords.longitude;
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
                    onDragStart={() => {
                        dispatch({ type: "CENTERED_ON_UNCENTERED" });
                    }}
                >
                    {clientLocation && (
                        <RenderClientLocation
                            location={memoizedClientLocation}
                        />
                    )}
                    <RenderMapMarker
                        dateSenzor={[currentLocation]}
                        theme={mapTheme}
                    />
                    <Button>test</Button>
                </GoogleMap>
            </motion.div>
        );
};

export default Map;
