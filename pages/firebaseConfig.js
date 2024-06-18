// import * as functions from "firebase-functions";

// const firebaseConfig = {
//     // apiKey: process.env.API_KEY,
//     // authDomain: process.env.AUTH_DOMAIN,
//     // projectId: process.env.PROJECT_ID,
//     // storageBucket: process.env.STORAGE_BUCKET,
//     // messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     // appId: process.env.APP_ID,
//     // measurementId: process.env.MEASUREMENT_ID

//     apiKey: functions.config().fb.client_config.API_KEY,
//     authDomain: functions.config().fb.client_config.AUTH_DOMAIN,
//     projectId: functions.config().fb.client_config.PROJECT_ID,
//     storageBucket: functions.config().fb.client_config.STORAGE_BUCKET,
//     messagingSenderId: functions.config().fb.client_config.MESSAGING_SENDER_ID,
//     appId: functions.config().fb.client_config.APP_ID,
//     measurementId: functions.config().fb.client_config.MEASUREMENT_ID
// };

// export default firebaseConfig;

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };
  
// Initialize Firebase
export default firebaseConfig;
  

