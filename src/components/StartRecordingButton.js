import { Button } from "react-bootstrap";
import { UserAuth } from "../context/AuthContextProvider";
import { useSelector } from "react-redux";
import { startRecording, stopRecording } from "../actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addDoc, doc, serverTimestamp, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Timestamp } from "firebase/firestore";

const StartRecordingButton = () => {
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const recordingState = useSelector((state) => state.routeRecording);
    const [textToggle, setTextToggle] = useState("Start");
    const [tripStartTime, setTripStartTime] = useState(0);

    const addTripTime = async (type) => {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
        });
        await addDoc(collection(db, `users/${user.uid}/trips`), {
            startTime: tripStartTime,
            endTime: Timestamp.now(),
        });
    };

    const toggleRecording = () => {
        if (recordingState) {
            dispatch(stopRecording());
            setTextToggle("Start");
            addTripTime();
        } else {
            dispatch(startRecording());
            setTextToggle("Stop");
            setTripStartTime(Timestamp.now());
        }
    };

    useEffect(() => {
        const data = window.sessionStorage.getItem("routeRecording");
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
        window.sessionStorage.setItem("routeRecording", JSON.stringify(recordingState));
    }, [recordingState]);

    return (
        <>
            <Button onClick={toggleRecording} className="margin-left">
                {textToggle} recording route
            </Button>
        </>
    );
};

export default StartRecordingButton;
