import { Button } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContextProvider";
import { useSelector } from "react-redux";
import { startRecording, stopRecording } from "../../actions";
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
        if (recordingState) {
            setTextToggle("Stop");
        } else {
            setTextToggle("Start");
        }
    }, []);
    return (
        <>
            <Button onClick={toggleRecording}>{textToggle} recording route</Button>
            <p>{recordingState.toString()}</p>
        </>
    );
};

export default StartRecordingButton;
