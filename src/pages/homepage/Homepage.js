import "./Homepage.css";
import LoginButton from "../../components/LoginButton";
import logoWhite from "../../assets/logo_white.png";

const Homepage = () => {
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
