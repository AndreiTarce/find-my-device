import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import StartRecordingButton from "../../components/Map/StartRecordingButton";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Map />
            <StartRecordingButton />
        </div>
    );
};

export default Dashboard;
