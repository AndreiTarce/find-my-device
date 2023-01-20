import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import StartRecordingNotification from "../../components/notifications/StartRecordingNotification";
import StartRecordingButton from "../../components/StartRecordingButton";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <Map />
            <StartRecordingButton />
            <Toaster position="top-center" />
        </div>
    );
};

export default Dashboard;
