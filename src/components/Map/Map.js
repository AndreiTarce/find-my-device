import { db } from "../../utils/firebase";
import { collection, getDocs, doc, onSnapshot, query } from "firebase/firestore";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Map.css";

const Map = () => {
    const [dateSenzor, setDateSenzor] = useState([]);

    const q = query(collection(db, "date_senzor"));
    const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
            const date_senzor = [];
            querySnapshot.forEach((doc) => {
                date_senzor.push(doc.data().longitude);
            });
            setDateSenzor(date_senzor);
            unsubscribe();
        },
        (error) => {
            console.log(error);
        }
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
            <h1>Map</h1>
            <p>{dateSenzor}</p>
            <ShowMap />
        </>
    );
};

export default Map;

function ShowMap() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    );
}
