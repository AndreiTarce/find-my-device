import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const DeleteTripModal = (props) => {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    You are about to delete a trip from your history
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this trip?</p>
                <strong>Warning!</strong>
                <p>You can't undo this action</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onConfirm}>Confirm</Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteTripModal;
