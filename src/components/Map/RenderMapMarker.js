import { Marker, GoogleMap } from "@react-google-maps/api";
import currentLocation from "../../assets/location.svg";
import pastLocation from "../../assets/new-moon.png";
import "./MapMarker.css";

const RenderMapMarker = ({ dateSenzor }) => {
    const google = window.google;
    return (
        <>
            {dateSenzor.map((data, index) =>
                index !== dateSenzor.length - 1 ? (
                    <div className="transparent">
                        <Marker
                            key={index}
                            position={{ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }}
                            icon={pastLocation}
                        />
                    </div>
                ) : (
                    <Marker
                        key={index}
                        position={{ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }}
                        icon={currentLocation}
                        animation={google.maps.Animation.BOUNCE}
                    />
                )
            )}
        </>
    );
};
export default RenderMapMarker;
