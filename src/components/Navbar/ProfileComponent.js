import { UserAuth } from "../../context/AuthContextProvider";
import { Container, Image, Row, Col, Navbar, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import LoginButton from "../LoginButton";
import "./ProfileComponent.css";
import MapThemeToggler from "./MapThemeToggler";

const ProfileComponent = () => {
    const { user } = UserAuth();
    return (
        <>
            <Image
                roundedCircle
                referrerPolicy="no-referrer"
                src={user.photoURL}
                width={40}
                height={40}
            />
            <NavDropdown title={user.displayName} align="end">
                <div className="d-grid px-2">
                    <LoginButton />
                </div>
                <MapThemeToggler />
            </NavDropdown>
        </>
    );
};

export default ProfileComponent;
