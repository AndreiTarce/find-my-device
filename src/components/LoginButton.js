import { Button } from "react-bootstrap";
import { UserAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ className, variant, size }) => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    if (user) {
        return (
            <Button
                className={className}
                variant={variant}
                size={size}
                onClick={handleSignOut}
            >
                Logout
            </Button>
        );
    }

    return (
        <Button
            className={className}
            variant={variant}
            size={size}
            onClick={() => {
                navigate("/signin");
            }}
        >
            Sign in
        </Button>
    );
};

export default LoginButton;
