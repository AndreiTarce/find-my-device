const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin");

const app = express();
admin.initializeApp();
const firestore = admin.firestore();
app.use(cors());

/*HTTP FUNCTIONS*/

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send({ response: 1 });
});

app.post("/", async (req, res) => {
    const sensor_data = req.body;
    const dataToSend = {
        time: admin.firestore.FieldValue.serverTimestamp(),
        latitude: sensor_data.latitude,
        longitude: sensor_data.longitude,
    };
    await admin.firestore().collection("date_senzor").add(dataToSend);
    await admin.firestore().collection("date_senzor").doc("current_location").set(dataToSend);
    res.status(201).send();
});

app.post("/delete_trips", async (req, res) => {
    const { userId } = req.body;
    await deleteCollection(firestore, `users/${userId}/trips`, 10);
    res.status(200).send();
});

exports.senzor = functions.region("europe-west1").https.onRequest(app);

/*Distance Calculator Function*/

exports.calculateRouteDistance = functions
    .region("europe-west1")
    .firestore.document("users/{userId}/trips/{docId}")
    .onCreate(async (snap, context) => {
        const newValue = snap.data();
        const { startTime, endTime } = newValue;
        const userId = context.params.userId;
        const docId = context.params.docId;

        // const name = newValue.name;
        const unfilteredLocationArray = [];
        const query = await admin
            .firestore()
            .collection(`date_senzor`)
            .where("time", ">=", startTime)
            .get()
            .then((result) => {
                result.forEach((doc) => {
                    unfilteredLocationArray.push(doc.data());
                });
            });
        const filteredLocationArray = unfilteredLocationArray.filter((location) => location.time <= endTime);
        filteredLocationArray.sort((a, b) => a.time - b.time);
        let totalDistance = 0;
        for (let i = 0; i < filteredLocationArray.length - 1; i++) {
            const distanceBetweenPoints = haversine_distance(filteredLocationArray[i], filteredLocationArray[i + 1]);
            totalDistance += distanceBetweenPoints;
        }
        await admin.firestore().doc(`users/${userId}/trips/${docId}`).update({ distanceCovered: totalDistance });
        // perform desired operations ...
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy("__name__").limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

function haversine_distance(mk1, mk2) {
    const R = 6371.071; // Radius of the Earth in miles
    const rlat1 = mk1.latitude * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = mk2.latitude * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (mk2.longitude - mk1.longitude) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
            )
        );
    return d;
}
