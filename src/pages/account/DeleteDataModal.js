import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { deleteTrips } from "../../api";

const DeleteDataModal = ({ userId }) => {
    const [show, setShow] = useState(false);

    const handleClose = async () => {
        await deleteTrips(userId);
        setShow(false);
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Delete my data
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm data deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>You are about to delete all your trips data!</strong>
                    <p>Are you sure? You can also delete individual trips from the History tab.</p>
                    <br></br>
                    <p>
                        <strong>Warning! You can't undo this action.</strong>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteDataModal;
