import { db } from "../../utils/firebase";
import { collection, getDocs, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import { Button, Container } from "react-bootstrap";
import RenderMapMarker from "./RenderMapMarker";

const Map = () => {
    const [dateSenzor, setDateSenzor] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");

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

    async function calculateRoute() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: { lat: 46.777415, lng: 23.60673 },
            destination: { lat: 46.756253, lng: 23.796576 },
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.WALKING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
    }

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
            <Button onClick={calculateRoute}>Calculate route</Button>
            <Button
                onClick={() => {
                    setLatitude(latitude + 1);
                }}
            >
                +1 latitude
            </Button>
            <p>Distanta rutei:{distance}</p>
        </>
    );
};

export default Map;
