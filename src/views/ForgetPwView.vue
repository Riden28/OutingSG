<template>
    <NavBar />
    <div class="row">
        <!-- left side of the login page -->
        <div class='rowBackground'>
            <div class="column left">
                <h2>Welcome to</h2>
                <p><img src='../assets/Logo/OutingSG_white.png'></p>
                <p>Singapore, a bustling city-state renowned for its vibrant culture and diverse entertainment options,
                    lacks a comprehensive and user-friendly platform that efficiently recommends hangout spots, upcoming
                    events and festivals, and unique date activities. Locals often struggle to discover novel and
                    exciting experiences within their city, leading to repetitive outings and missed opportunities to
                    explore Singapore's dynamic social scene.</p>
                <br>
                <h4>But with OutingSG, we can solve this problem.</h4>
            </div>
            <!-- Reset Password Form -->
            <div class="column right">
                <p class='pageTitle'>Forget Password</p>

                <div class='emailSent' v-if="successMessage">
                    <p>
                        <img src="../assets/icons/tick.png" class="smallIcon">
                        {{ successMessage }}
                    </p>
                </div>
                <hr>
                <form id="forgetPw" @submit.prevent="resetPassword">
                    <!-- Email -->
                    <div class="middleInput">
                        <p>
                            <label for="email"><img src='../assets/icons/email.png' class="smallIcon"> Email</label>
                            <br><input type="email" id='email' placeholder="Enter your email" required v-model="email" style='width: 80%;' class='formInput'>
                            <br>
                        </p>
                    </div>
                    <center>
                        <br><button type="submit" style="width:80%;" class='buttonSubmit'>Send a password reset link</button>
                        <!-- click to go to login page -->
                        <p style="margin-top: 10px;" class="greyText">
                            Back to <router-link to='/login' style="color: var(--secondary) !important;">login</router-link>
                        </p>
                    </center>
                </form>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/main.css';
import '../assets/bootstrap.css';
import '../router/bootstrap.js';
import '../assets/loginRegister.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import NavBar from '@/components/NavBar.vue';

// Initialize Firebase
initializeApp(firebaseConfig);

export default {
    name: 'resetPw',
    components: {
        NavBar
    },
    data() {
        return {
            email: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    mounted() {
        window.scrollTo(0, 0);
    },
    methods: {
        resetPassword() {
            //console.log("method called!") // Debug
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    this.successMessage = "Password reset email sent successfully! Check your inbox.";
                    this.errorMessage = "";
                })
                // Note: non existing emails don't cause any error to be thrown
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            this.errorMessage = 'Invalid email format.';
                            break;
                        case 'auth/user-not-found':
                            this.errorMessage = 'No user found with this email.';
                            break;
                        default:
                            this.errorMessage = 'Error sending password reset email.';
                    }
                    this.successMessage = "";
                });
        }
    }
};
</script>

<style>
/* Add styles for error and success messages */
.error-message {
    color: red;
    margin: 10px 0;
    text-align: center;
}
.success-message {
    color: green;
    margin: 10px 0;
    text-align: center;
}

.buttonSubmit{
    background-color: var(--secondary);
    border: solid var(--secondary);
    color: white !important;
}

.buttonSubmit:hover {
    background-color: var(--transparent);
    border: solid var(--secondary);
    color: black !important;
}
</style>