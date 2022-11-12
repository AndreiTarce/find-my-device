import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContextProvider";

const IsLoggedIn = ({ children }) => {
    const { user } = UserAuth();
    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default IsLoggedIn;
