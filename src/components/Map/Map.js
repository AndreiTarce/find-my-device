import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import RenderMapMarker from "./RenderMapMarker";
import { UserAuth } from "../../context/AuthContextProvider";
import { addSensorData } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import { Timestamp } from "firebase/firestore";

const Map = () => {
    const { user } = UserAuth();
    const dateSenzor = useSelector((state) => state.sensorData);
    const currentLocation = useSelector((state) => state.currentLocation);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch();
    const center = useMemo(() => ({ lat: latitude, lng: longitude }));

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
                dispatch({ type: "UPDATE_CURRENT_LOCATION", payload: querySnapshot.data() });
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const options = useMemo(() => ({ mapId: "a1c984e18919c1dc" }));

    //rendering below
    if (!isLoaded) return <LoaderSpinner />;

    return (
        <div id="dashboard-map">
            <GoogleMap zoom={15} center={center} mapContainerClassName="map-container" options={options}>
                <RenderMapMarker dateSenzor={[currentLocation]} />
            </GoogleMap>
        </div>
    );
};

export default Map;
