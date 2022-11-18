const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin");

const app = express();
admin.initializeApp();

app.get("/", (req, res) => {});
app.post("/", async (req, res) => {
    const sensor_data = req.body;
    await admin.firestore().collection("date_senzor").add(sensor_data);
    res.status(201).send();
});

exports.senzor = functions.region("europe-west1").https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
