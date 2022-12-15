import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginButton from "../../components/LoginButton";
import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { Image } from "react-bootstrap";

const Account = () => {
    const { user } = UserAuth();
    let image;
    if (user) {
        image = user.photoURL;
    }
    if (image)
        return (
            <div>
                <Navbar />
                <Container>
                    <h1>Account page</h1>
                    <h2>Welcome {user.displayName}</h2>
                    <p>Email: {user.email}</p>
                    <Image
                        roundedCircle
                        referrerPolicy="no-referrer"
                        src={image.replace("s96-c", "s400-c")}
                        // width={40}
                        // height={40}
                    />
                </Container>
                <Container fluid>
                    <Row>
                        <Col>1 of 1</Col>
                    </Row>
                </Container>
                <LoginButton />
            </div>
        );
};

export default Account;
