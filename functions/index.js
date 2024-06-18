/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID
// };
// console.log(firebaseConfig);
// module.exports = firebaseConfig;

// const functions = require('firebase-functions');
// const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
// const admin = require('firebase-admin');
// const cors = require('cors')({origin: true});

// admin.initializeApp();

// Initialize Secret Manager client
// const client = new SecretManagerServiceClient();

// Function to fetch the secret value from Secret Manager
// async function accessSecretVersion() {
//     const [version] = await client.accessSecretVersion({
//         name: 'projects/outingsg/secrets/FB_CONFIG/versions/latest',
//     });

//     const payload = version.payload.data.toString('utf8');
//     return JSON.parse(payload);
// }

// HTTP function to expose the secret values

// exports.getFirebaseConfig = functions.https.onRequest(async (req, res) => {
//     try {
//         const firebaseConfig = await accessSecretVersion();
//         res.status(200).json(firebaseConfig);
//     } catch (error) {
//         console.error('Error fetching Firebase config:', error);
//         res.status(500).send('Error fetching Firebase config');
//     }
// });

// exports.getFirebaseConfig = functions.https.onRequest(async (req, res) => {
//     cors(req, res, async () => {
//         try {
//             const [version] = await client.accessSecretVersion({
//                 name: 'projects/outingsg/secrets/FB_CONFIG/versions/latest',
//             });

//             const payload = version.payload.data.toString('utf8');
//             const config = JSON.parse(payload);
//             res.status(200).json(config);
//         } catch (err) {
//             console.error('Error accessing secret version:', err);
//             res.status(500).send('Error accessing secret version');
//         }
//     });
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

admin.initializeApp();

const client = new SecretManagerServiceClient({email: "outingsg@appspot.gserviceaccount.com"});
const corsOptions = {
    origin: 'https://outingsg.web.app', // Your frontend URL
    optionsSuccessStatus: 200
};

exports.getFirebaseConfig = functions.https.onRequest((req, res) => {
    cors(corsOptions)(req, res, async () => {
        try {
            const [version] = await client.accessSecretVersion({
                name: 'projects/outingsg/secrets/FB_CONFIG/versions/latest',
            });

            const payload = version.payload.data.toString('utf8');
            const config = JSON.parse(payload);

            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, POST');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.status(200).json(config);
            console.log(payload);
            return config;
        } catch (err) {
            console.error('Error accessing secret version:', err);
            res.status(500).send('Error accessing secret version');
        }
    });
});

// exports.hello = onRequest((request, response) => {
//     response.send(`Hello ${import.meta.env.API_KEY} and ${process.env.API_KEY}`);
//   });


