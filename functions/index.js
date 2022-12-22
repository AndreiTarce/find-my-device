const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin");

const app = express();
admin.initializeApp();
const firestore = admin.firestore();
app.use(cors());

app.get("/", (req, res) => {});
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
