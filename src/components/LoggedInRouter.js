import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContextProvider";

const LoggedInRouter = () => {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to="/home" />;
    }

    return <Navigate to="/dashboard" />;
};

export default LoggedInRouter;
