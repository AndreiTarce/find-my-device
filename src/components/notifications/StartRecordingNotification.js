import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const StartRecordingNotification = () => {
    const startShow = useSelector((state) => state.recordingNotification.startShow);
    const endShow = useSelector((state) => state.recordingNotification.endShow);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "END_NOTIFICATION" });
    }, []);

    return (
        <>
            <ToastContainer className="p-3" position="bottom-end">
                <Toast
                    bg="primary"
                    onClose={() => {
                        dispatch({ type: "END_NOTIFICATION" });
                    }}
                    show={startShow}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>
                        <strong className="me-auto">Started</strong> recording route!
                    </Toast.Body>
                </Toast>
                <Toast
                    bg="dark"
                    onClose={() => {
                        dispatch({ type: "END_NOTIFICATION" });
                    }}
                    show={endShow}
                    delay={3000}
                    autohide
                >
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
