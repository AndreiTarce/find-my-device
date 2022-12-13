import { UserAuth } from "../../context/AuthContextProvider";
import { Container, Image, Row, Col, Navbar, Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import LoginButton from "../LoginButton";
import "./ProfileComponent.css";

const ProfileComponent = () => {
    const { user } = UserAuth();
    return (
        <>
            <Image roundedCircle referrerPolicy="no-referrer" src={user.photoURL} width={40} height={40} />
            <NavDropdown title={user.displayName}>
                {/* <NavDropdown.Item href="/account">Account</NavDropdown.Item> */}
                {/* <NavDropdown.Divider /> */}
                <div className="d-grid px-2">
                    <LoginButton />
                </div>
            </NavDropdown>
        </>
    );
};

export default ProfileComponent;
