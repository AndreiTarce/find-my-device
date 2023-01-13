import { db } from "../../utils/firebase";
import { doc, updateDoc, query, where, collection, getDocs } from "firebase/firestore";

const updateTripName = async (trip, userId) => {
    const docRef = collection(db, `users/${userId}/trips`);
    const q = query(docRef, where("startTime", "==", trip.startTime));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
            name: trip.newTripName,
        });
    });
};

export default updateTripName;
