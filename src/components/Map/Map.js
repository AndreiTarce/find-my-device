import { db } from "../../utils/firebase";
import { collection, getDocs, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useMemo, useEffect } from "react";
import "./Map.css";
import { Button, Container } from "react-bootstrap";
import location from "../../assets/location.svg";
import { pushAtSortPosition } from "array-push-at-sort-position";

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
        onSnapshot(
            collection(db, "date_senzor"),
            (querySnapshot) => {
                const changes = querySnapshot.docChanges();
                changes.forEach((change) => {
                    if (change.type === "added") {
                        addDateSenzor(change.doc.data());
                        console.log(change.doc.data().time);
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
                zoom={5}
                center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                mapContainerClassName="map-container"
                options={options}
            >
                <Marker position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} icon={location} />
                {dateSenzor.map((data, index) => (
                    <Marker
                        key={index}
                        position={{ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }}
                        icon={location}
                    />
                ))}
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
            {dateSenzor.map((data, index) => (
                <p key={index}>
                    time:{data.time}
                    latitude:{data.latitude}
                    longitude:{data.longitude}
                </p>
            ))}
            <p>Distanta rutei:{distance}</p>
        </>
    );
};

export default Map;
