import { todoListState } from "../../atoms/todoListState";
import { useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const Homepage = () => {
    const [state, setState] = useRecoilState(todoListState);
    const addTestData = async () => {
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        });
    };

    const getDataTest = async () => {
        const docRef = doc(db, "cities", "LA");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };
    return (
        <>
            <h1>HomePage</h1>
            {state}
            <button
                onClick={() => {
                    setState([...state, "nou"]);
                }}
            >
                test
            </button>
            <h2>Add test data</h2>
            <button onClick={addTestData}>Buton de add test data</button>
            <button onClick={getDataTest}>Buton de get data test</button>
        </>
    );
};

export default Homepage;
