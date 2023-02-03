import { Marker } from "@react-google-maps/api";
import currentLocation from "../../assets/location.svg";
import pastLocation from "../../assets/new-moon.png";
import currentLocationWhite from "../../assets/location_white.png";
import "./MapMarker.css";
import { DARK } from "../../reducers/mapThemeToggler";

const RenderMapMarker = ({ dateSenzor, theme }) => {
    const google = window.google;
    return (
        <>
            {dateSenzor.map((data, index) =>
                index !== dateSenzor.length - 1 ? (
                    <div className="transparent">
                        <Marker
                            key={data.latitude}
                            position={{
                                lat: parseFloat(data.latitude),
                                lng: parseFloat(data.longitude),
                            }}
                            icon={pastLocation}
                        />
                    </div>
                ) : (
                    <Marker
                        key={data.latitude}
                        position={{
                            lat: parseFloat(data.latitude),
                            lng: parseFloat(data.longitude),
                        }}
                        icon={theme === DARK ? currentLocationWhite : currentLocation}
                        animation={google.maps.Animation.BOUNCE}
                    />
                )
            )}
        </>
    );
};
export default RenderMapMarker;
