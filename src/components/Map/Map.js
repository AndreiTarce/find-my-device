import { db } from "../../utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import RenderMapMarker from "./RenderMapMarker";
import { UserAuth } from "../../context/AuthContextProvider";
import { addSensorData } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Map = () => {
    const { user } = UserAuth();
    const dateSenzor = useSelector((state) => state.sensorData);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch();

    const addDateSenzor = (data) => {
        dispatch(addSensorData(data));
        setLatitude(data.latitude);
        setLongitude(data.longitude);
    };

    //real-time sensor data fetching
    useEffect(() => {
        const q = query(collection(db, "date_senzor"));
        onSnapshot(
            q,
            async (querySnapshot) => {
                const changes = querySnapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === "added") {
                        addDateSenzor(change.doc.data());
                    } else if (change.type === "removed") {
                        console.log("removed");
                    }
                });
                dispatch({ type: "SORT_SENSOR_DATA" });
            },
            (error) => {
                console.log(error);
            }
        );
        console.log(dateSenzor);
    }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const options = useMemo(() => ({ mapId: "a1c984e18919c1dc" }));

    //rendering below
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <>
            <GoogleMap
                zoom={15}
                center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                mapContainerClassName="map-container"
                options={options}
            >
                <RenderMapMarker dateSenzor={dateSenzor} />
            </GoogleMap>
        </>
    );
};

export default Map;
