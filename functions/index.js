const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin");

const app = express();
admin.initializeApp();
const firestore = admin.firestore();

app.get("/", (req, res) => {});
app.post("/", async (req, res) => {
    const sensor_data = req.body;
    const dataToSend = {
        time: admin.firestore.FieldValue.serverTimestamp(),
        latitude: sensor_data.latitude,
        longitude: sensor_data.longitude,
    };
    await admin.firestore().collection("date_senzor").add(dataToSend);
    res.status(201).send();
});

exports.senzor = functions.region("europe-west1").https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
