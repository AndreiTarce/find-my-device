import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContextProvider";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Homepage.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
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
                    <Button onClick={handleSignOut}>Logout</Button>
                ) : (
                    <Button
                        onClick={() => {
                            navigate("/signin");
                        }}
                    >
                        Sign in
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Homepage;
