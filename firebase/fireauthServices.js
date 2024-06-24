// redirectIfAuthenticated.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './firebaseConfig.js';

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



// Log in function
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is authenticated. Redirecting to homepage.");
    window.location.href = "loggedin.html";
  } else {
    console.log("No user is authenticated.");
    // Show the body if the user is unauthenticated
    document.body.style.display = 'block';
  }
});

//________________________


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