import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContextProvider";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Homepage.css";
import { Navigate } from "react-router-dom";

const Homepage = () => {
    const { user, logOut } = UserAuth();
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="homepage">
            <div className="items">
                <h1>HomePage</h1>
                {user?.displayName ? (
                    <button onClick={handleSignOut}>Logout</button>
                ) : (
                    <Link to="/signin">Sign in</Link>
                )}
            </div>
        </div>
    );
};

export default Homepage;
