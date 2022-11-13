import React from "react";
import LoginButton from "../../components/LoginButton";
import { UserAuth } from "../../context/AuthContextProvider";

const Account = () => {
    const { user } = UserAuth();

    return (
        <div>
            <h1>Account</h1>
            <div>
                <p>Welcome, {user?.displayName}</p>
            </div>
            <LoginButton />
        </div>
    );
};

export default Account;
