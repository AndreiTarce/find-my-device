import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { UserAuth } from "../../context/AuthContextProvider";
import "./Homepage.css";
import { Navigate } from "react-router-dom";
import LoginButton from "../../components/LoginButton";
import logoWhite from "../../assets/logo_white.png";

const Homepage = () => {
    const { user } = UserAuth();

    return (
        <div className="homepage">
            <div className="items">
                <img src={logoWhite} />
                <LoginButton />
            </div>
        </div>
    );
};

export default Homepage;
