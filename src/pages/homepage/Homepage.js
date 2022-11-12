import { todoListState } from "../../atoms/todoListState";
import { useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContextProvider";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Homepage.css";

const Homepage = () => {
    const { user, logOut } = UserAuth();
    // const [state, setState] = useRecoilState(todoListState);
    // const addTestData = async () => {
    //     await setDoc(doc(db, "cities", "LA"), {
    //         name: "Los Angeles",
    //         state: "CA",
    //         country: "USA",
    //     });
    // };

    // const getDataTest = async () => {
    //     const docRef = doc(db, "cities", "LA");
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //         console.log("Document data:", docSnap.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // };
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="homepage">
            <div className="items">
                <h1>HomePage</h1>
                {user?.displayName ? (
                    <button onClick={handleSignOut}>Logout</button>
                ) : (
                    <Link to="/signin">Sign in</Link>
                )}
            </div>
        </div>
    );
};

export default Homepage;
