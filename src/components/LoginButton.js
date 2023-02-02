import { Button, Modal } from "react-bootstrap";
import { UserAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginButton = ({ className, variant, size }) => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    if (user) {
        return (
            <>
                <Button className={className} variant={variant} size={size} onClick={handleShow}>
                    Logout
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Logging out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <strong>You are about to log out of your account.</strong>
                        <p>Are you sure you want to do this?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleSignOut}>Confirm</Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
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
