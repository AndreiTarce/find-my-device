import React from "react";
import { UserAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = UserAuth();
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        // <BootstrapNavbar sticky="top" bg="dark" variant="dark">
        //     <Container>
        //         <Row>
        //             <Col>
        //                 <BootstrapNavbar.Brand href="#home">Navbar</BootstrapNavbar.Brand>
        //             </Col>
        //         </Row>
        //         <Nav className="me-auto">
        //             <Nav.Link href="#home">Home</Nav.Link>
        //             <Nav.Link href="#features">Features</Nav.Link>
        //             <Nav.Link href="/account">Account</Nav.Link>
        //         </Nav>
        //         <Row>
        //             <Col>
        //             </Col>
        //         </Row>
        //     </Container>
        // </BootstrapNavbar>
        <BootstrapNavbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <BootstrapNavbar.Brand href="#home">React-Bootstrap</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
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
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
