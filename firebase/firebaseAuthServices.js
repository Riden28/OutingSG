import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from './firebaseConfig.js';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);


// doesnt work :(

// async function preview_listings(){
// const querySnapshot = await getDocs(collection(db, "outings"));
// var outings = [];
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//     var outing_details = doc.data();
//     outings.push({name: outing_details.name, details: outing_details.description, url: outing_details.images[0]})
//     // console.log(doc.id, " => ", outing_details.images[0]);
//     });
//     return outings;
// }

// export default preview_listings;

function shuffle(listings) {
    for (let i = listings.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index
        [listings[i], listings[j]] = [listings[j], listings[i]]; // Swap elements
    }
    return listings;
    }

export default shuffle