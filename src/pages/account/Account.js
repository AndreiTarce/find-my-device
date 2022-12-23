import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";
import { Image } from "react-bootstrap";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const Account = () => {
    return (
        <div>
            <Navbar />
            <ProfileCard />
        </div>
    );
};

export default Account;
