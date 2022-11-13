import { UserAuth } from "../../context/AuthContextProvider";
import { Container, Image, Row, Col, Navbar, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import LoginButton from "../LoginButton";
import "./ProfileComponent.css";

const ProfileComponent = () => {
    const { user } = UserAuth();
    return (
        <>
            <Image
                roundedCircle
                referrerpolicy="no-referrer"
                src={user.photoURL}
                width={40}
                height={40}
            />
            <NavDropdown title={user.displayName}>
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                    Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <div className="d-grid">
                    <LoginButton />
                </div>
            </NavDropdown>
        </>
    );
};

export default ProfileComponent;
