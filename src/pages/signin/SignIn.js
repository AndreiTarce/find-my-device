import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="homepage">
            <div className="items">
                <h1>Sign in</h1>
                <div>
                    <GoogleButton onClick={handleGoogleSignIn} />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
