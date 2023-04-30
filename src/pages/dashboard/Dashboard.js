import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import StartRecordingButton from "../../components/StartRecordingButton";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
    const dispatch = useDispatch();
    const centeredOn = useSelector((state) => state.mapCenter);

    const getCenteredOn = () => {
        if (centeredOn === "tracker") {
            return "Tracker";
        }
        if (centeredOn === "client") {
            return "Your location";
        }
        return "Uncentered";
    };
    return (
        <div className="dashboard">
            <Navbar />
            <Map />
            <div className="dashboard-buttons-container">
                <StartRecordingButton />
                <Button className="margin-left" variant="outline-dark" disabled>
                    Centered on:
                    <Badge pill bg="primary" className="margin-left">
                        {getCenteredOn()}
                    </Badge>
                </Button>
                <Button
                    onClick={() => {
                        dispatch({ type: "CENTERED_ON_CLIENT" });
                    }}
                    className="margin-left"
                >
                    Center map on your location
                </Button>
                <Button
                    onClick={() => {
                        dispatch({ type: "CENTERED_ON_TRACKER" });
                    }}
                    className="margin-left"
                >
                    Center map on tracker location
                </Button>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default Dashboard;
