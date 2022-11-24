import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import LoginButton from "../LoginButton";
import ProfileComponent from "./ProfileComponent";
import logoWhite from "../../assets/logo_white.png";

const Navbar = () => {
    return (
        <BootstrapNavbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <BootstrapNavbar.Brand href="/">
                    <img src={logoWhite} height={30} />
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/account">Account</Nav.Link>
                        <Nav.Link href="/history">History</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <ProfileComponent />
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
