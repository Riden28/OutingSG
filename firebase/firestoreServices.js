import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from './firebaseConfig.js';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// // Initialize Firebase Realtime Database
// const database = getDatabase(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);





//Basic functions
//homepage / explore / saved / history
async function previewOuting() {
    try {
        const outingsQuerySnapshot = await getDocs(collection(db, "outings"));
        outingsQuerySnapshot.forEach((doc) => {
            console.log(`Outing ID: ${doc.id}, Data:`, doc.data());
        });
    } catch (error) {
        console.error("Error printing outings:", error);
    }
};

//clicking on a listing
async function loadOuting(name) {
    try {
        const outingData = await getDoc(doc(db, "outings", name));
        if (!outingData.exists()) {
            console.error("No outing found with the name:", name);
            return;
        }
        console.log("Outing data:", outingData.data());
    } catch (error) {
        console.error("Error getting outing:", error);
    }
};
// async function getCityByName(cityName) {
//     try {
//       const cityQuerySnapshot = await getDocs(query(collection(db, "cities"), where("name", "==", normalizedCityName)));

//       if (cityQuerySnapshot.empty) {
//         console.error("No city found with the name:", cityName);
//         document.getElementById('city').innerText = `No city found with the name: ${cityName}`;
//         return;
//       }

//       cityQuerySnapshot.forEach((doc) => {
//           console.log(`City ID: ${doc.id}, Data:`, doc.data());
//       });
//     } catch (error) {
//       console.error("Error getting city:", error);
//     }
//     }

//creating a review
async function saveReview() {

};

//create listing
async function createOuting(outingData) {
    const { name, desc, location, coordinates, categories, max_price, min_price, max_pax, min_pax, rating, media } = outingData;
    try {
        // Check for required fields
        if (!name || !desc || !location || !coordinates || !categories || !max_price || !min_price || !max_pax || !min_pax || !rating || !media) {
            console.error("Required fields are missing!");
            return;
        }
        await setDoc(doc(db, "outings", name), {
            name,
            desc,
            location,
            coordinates,
            categories,
            max_price,
            min_price,
            max_pax,
            min_pax,
            rating,
            media
        });
        console.log(`Outing "${name}" added successfully!`);
    } catch (error) {
        console.error("Error adding outing:", error);
};
};

//update listing
async function updateOuting(name, newData) {
    try {
        await updateDoc(doc(db, "outings", name), newData);
        console.log(`Outing with ID "${name}" updated successfully!`);
    } catch (error) {
        console.error("Error updating outing:", error);
    }
};

//delete listing (if user is admin/owner of listing)
async function deleteOuting(name) {
    try {
        await deleteDoc(doc(db, "outings", name));
        console.log(`Outing with ID "${name}" deleted successfully!`);
    } catch (error) {
        console.error("Error deleting outing:", error);
    }
};





//Search & filtering functions



// Realtime Database functions
// function sendMessage() {
//     const message = document.getElementById('message').value;
//     const messagesRef = ref(database, 'messages/');
//     const newMessageRef = push(messagesRef);
//     set(newMessageRef, {
//     text: message
//     });
//     document.getElementById('message').value = '';
// }

// function displayMessages() {
//     const messagesRef = ref(database, 'messages/');
//     onValue(messagesRef, (snapshot) => {
//     const messages = snapshot.val();
//     const messagesDiv = document.getElementById('messages');
//     messagesDiv.innerHTML = '';
//     for (const key in messages) {
//         const message = messages[key].text;
//         const messageElement = document.createElement('p');
//         messageElement.textContent = message;
//         messagesDiv.appendChild(messageElement);
//     }
//     });
// };


