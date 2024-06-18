// authCheck.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import firebaseConfig from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Auth check initiated");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("No user is authenticated. Redirecting to login.");
    window.location.href = "login.html";
  } else {
    console.log("User is authenticated:", user);
    // Show the body if the user is authenticated
    document.body.style.display = 'block';
  }
});
