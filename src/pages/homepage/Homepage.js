import "./Homepage.css";
import LoginButton from "../../components/LoginButton";

const Homepage = () => {
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
