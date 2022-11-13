import React from "react";
import LoginButton from "../../components/LoginButton";
import Navbar from "../../components/Navbar/Navbar";
import { UserAuth } from "../../context/AuthContextProvider";

const Account = () => {
    const { user } = UserAuth();

    return (
        <div>
            <Navbar />
            <div>
                <p>Welcome, {user?.displayName}</p>
            </div>
            <LoginButton />
        </div>
    );
};

export default Account;
