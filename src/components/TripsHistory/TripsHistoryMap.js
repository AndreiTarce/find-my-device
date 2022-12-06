import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const TripsHistoryMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const options = useMemo(() => ({ mapId: "a1c984e18919c1dc" }));

    //rendering below
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div id="trip-history-map-wrapper">
            <div id="trip-history-map-container">
                <GoogleMap
                    zoom={15}
                    center={{
                        lat: 42,
                        lng: 27,
                    }}
                    mapContainerClassName="map-container"
                    options={options}
                >
                    {/* <RenderMapMarker dateSenzor={dateSenzor} /> */}
                </GoogleMap>
            </div>
        </div>
    );
};

export default TripsHistoryMap;
