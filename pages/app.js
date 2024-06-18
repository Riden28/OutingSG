import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './firebaseConfig.js';
// import { getFirebaseConfig } from "../functions/index.js";


// const app = initializeApp(getFirebaseConfig());
// fetch('https://us-central1-outingsg.cloudfunctions.net/getFirebaseConfig')
//     .then(response => response.json())
//     .then(data => {
//         // Use the fetched Firebase config data
//         console.log('Firebase Config:', data);
//         // Example: Initialize Firebase with the fetched config
//         app = initializeApp(data);
//         // Now you can use Firebase services
//     })
//     .catch(error => console.error('Error fetching Firebase config:', error));


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Log in function
async function logIn(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    console.log('Login Successful:', user);
    window.location.href = "loggedin.html"; // Redirect to logged in page
  } catch (error) {
    console.error('Error logging in:', error.message);
    alert("Error logging in: " + error.message);
  }
}

// Log out function
function logOut() {
  console.log('Attempting to log out...');
  signOut(auth).then(() => {
    console.log('User signed out.');
    window.location.href = "login.html";
  }).catch((error) => {
    console.error('Error signing out: ', error);
  });
}

// Export functions
window.logIn = logIn;
window.logOut = logOut;
