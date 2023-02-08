import { Marker } from "@react-google-maps/api";
import "./MapMarker.css";
import clientLocation from "../../assets/client_location.png";
import { motion } from "framer-motion";

// TODO : fix react keys

const RenderClientLocation = ({ location }) => {
    const google = window.google;
    return (
        <>
            <Marker
                label={{
                    text: "Your location",
                    className: "client-location-label",
                    color: "#ed145b",
                }}
                key={`client${location.latitude}`}
                position={{
                    lat: parseFloat(location.latitude),
                    lng: parseFloat(location.longitude),
                }}
                icon={clientLocation}
                animation={google.maps.Animation.BOUNCE}
            />
        </>
    );
};
export default RenderClientLocation;
