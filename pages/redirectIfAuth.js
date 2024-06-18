// redirectIfAuthenticated.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import firebaseConfig from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Auth check for login page initiated");

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
