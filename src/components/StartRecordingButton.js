import { Button } from "react-bootstrap";
import { UserAuth } from "../context/AuthContextProvider";
import { useSelector } from "react-redux";
import { startRecording, stopRecording } from "../actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const StartRecordingButton = () => {
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const recordingState = useSelector((state) => state.routeRecording);
    const [textToggle, setTextToggle] = useState("Start");

    const toggleRecording = () => {
        if (recordingState) {
            dispatch(stopRecording());
            setTextToggle("Start");
        } else {
            dispatch(startRecording());
            setTextToggle("Stop");
        }
    };

    useEffect(() => {
        const data = window.sessionStorage.getItem("routeRecording");
        console.log(data);
        if (data == "true") {
            dispatch(startRecording());
        } else {
            dispatch(stopRecording());
        }
    }, []);

    useEffect(() => {
        if (recordingState) {
            setTextToggle("Stop");
        } else {
            setTextToggle("Start");
        }
    }, [recordingState]);

    useEffect(() => {
        window.sessionStorage.setItem("routeRecording", JSON.stringify(recordingState));
    }, [recordingState]);

    return (
        <>
            <Button onClick={toggleRecording}>{textToggle} recording route</Button>
            <p>Route is recording: {recordingState.toString()}</p>
        </>
    );
};

export default StartRecordingButton;
