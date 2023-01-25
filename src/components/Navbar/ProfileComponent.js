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
            <Nav.Item className="d-flex">
                <a href="/account">
                    <Image
                        roundedCircle
                        referrerPolicy="no-referrer"
                        src={user.photoURL}
                        width={40}
                        height={40}
                        className="me-2"
                    />
                </a>
                <NavDropdown title={user.displayName} align="end">
                    <div className="d-grid px-2">
                        <LoginButton />
                    </div>
                    <MapThemeToggler />
                </NavDropdown>
            </Nav.Item>
        </>
    );
};

export default ProfileComponent;
