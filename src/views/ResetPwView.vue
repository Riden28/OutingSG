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
                <p class='pageTitle'>Reset Password</p>
                <hr>
                <form id="resetPw" @submit.prevent="resetPassword">
                    <!-- Password and New Password -->
                    <v-row>
                        <v-col class='cols'>
                            <p>
                                <label for="password"><img src='../assets/icons/password.png' class="smallIcon"> Password</label>
                                <br><input type="password" 
                                            id='password'
                                            placeholder="Enter your password"
                                            required 
                                            v-model="password"
                                            class='formInput'>
                                <br>
                            </p>
                        </v-col>
                        <v-col class='cols'>
                            <p>
                                <label for="confirmPassword"><img src='../assets/icons/password.png' class="smallIcon"> Confirm Password</label>
                                <br><input type="password" 
                                            id='confirmPassword'
                                            placeholder="Re-type password"
                                            required 
                                            v-model="confirmPassword"
                                            class='formInput'>
                            </p>
                        </v-col>
                    </v-row>

                    <center>
                        <br><button type="submit" style="width:80%;" class='buttonSubmit'>Change Password</button>
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
// import '../assets/bootstrap.css';
import '../router/bootstrap.js';
import '../assets/loginRegister.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import NavBar from '@/components/NavBar.vue';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
    name: 'resetPw',
    components: {
        NavBar
    },
    data() {
        return {
            email: '',
            rememberme: false,
            successMessage: '',
            errorMessage: '' // Add error message state
        };
    },
    methods: {
        // const email = ref('');
        // const errorMessage = ref('');
        // const successMessage = ref('');

        resetPassword() {
            console.log("method called!") // Debug (Not being shown, is the method even being called?)
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    this.successMessage = "Password reset email sent successfully! Check your inbox.";
                    this.errorMessage = "";
                })
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

        // return {
        //     email,
        //     errorMessage,
        //     successMessage,
        //     resetPassword
        // };
    }
};
</script>

<style scoped>
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