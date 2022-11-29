import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import StartRecordingNotification from "../../components/notifications/StartRecordingNotification";
import StartRecordingButton from "../../components/StartRecordingButton";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <Map />
            <StartRecordingButton />
            <StartRecordingNotification />
        </div>
    );
};

export default Dashboard;
