import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { UserAuth } from "../../context/AuthContextProvider";
import "./Homepage.css";
import { Navigate } from "react-router-dom";
import LoginButton from "../../components/LoginButton";

const Homepage = () => {
    const { user } = UserAuth();

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="homepage">
            <div className="items">
                <h1>HomePage</h1>
                <LoginButton />
            </div>
        </div>
    );
};

export default Homepage;
