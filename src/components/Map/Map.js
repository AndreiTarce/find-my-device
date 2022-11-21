import { db } from "../../utils/firebase";
import { collection, getDocs, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import { Button, Container } from "react-bootstrap";
import RenderMapMarker from "./RenderMapMarker";
import { startRecording } from "./startRecording";
import { UserAuth } from "../../context/AuthContextProvider";

const Map = () => {
    const { user } = UserAuth();
    const [dateSenzor, setDateSenzor] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [directionsResponse, setDirectionsResponse] = useState(null);

    const addDateSenzor = (newData) => {
        setDateSenzor((oldDateSenzor) => [
            ...oldDateSenzor,
            {
                time: newData.time,
                latitude: newData.latitude,
                longitude: newData.longitude,
            },
        ]);
        setLatitude(newData.latitude);
        setLongitude(newData.longitude);
    };

    //real-time sensor data fetching
    useEffect(() => {
        const q = query(collection(db, "date_senzor"));
        onSnapshot(
            q,
            (querySnapshot) => {
                const changes = querySnapshot.docChanges();
                changes.forEach((change) => {
                    console.log("change");
                    if (change.type === "added") {
                        console.log("added");
                        addDateSenzor(change.doc.data());
                    } else if (change.type === "removed") {
                        console.log("removed");
                    }
                });
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
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
            <Button onClick={() => startRecording({ user })}>Start recording route</Button>
        </>
    );
};

export default Map;
