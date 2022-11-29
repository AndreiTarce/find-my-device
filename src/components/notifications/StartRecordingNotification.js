import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { useSelector } from "react-redux";

const StartRecordingNotification = () => {
    const recordingState = useSelector((state) => state.routeRecording);
    const [show, setShow] = useState(false);

    if (recordingState)
        return (
            <>
                <ToastContainer className="p-3" position="bottom-end">
                    <Toast bg="primary" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>
                            <strong className="me-auto">Started</strong> recording route!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        );

    if (!recordingState)
        return (
            <>
                <ToastContainer className="p-3" position="bottom-end">
                    <Toast bg="dark" onClose={() => setShow(true)} show={!show} delay={3000} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            <strong className="me-auto">Stopped</strong> recording route!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        );
};

export default StartRecordingNotification;
