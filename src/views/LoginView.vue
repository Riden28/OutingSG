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
            <!-- User login form -->
            <div class="column right">
                <p class='pageTitle'>User Login</p>
                <hr>
                <form id="login" @submit.prevent="logIn">
                    <!-- Email and Password -->
                    <div class="formRow">
                        <!-- Email -->
                        <div class="formColumn">
                            <p>
                                <label for="email"><img src='../assets/icons/email.png' class="smallIcon">
                                    Email</label>
                                <br><input type="text" id='email' placeholder="Enter your email" required
                                    v-model="email">
                                <br>
                            </p>
                        </div>
                        <!-- Password -->
                        <div class="formColumn">
                            <p>
                                <label for="password"><img src='../assets/icons/password.png' class="smallIcon">
                                    Password</label>
                                <br><input type="password" id='password' placeholder="Enter your password" required
                                    v-model="password">
                            </p>
                        </div>
                    </div>
                    <!-- Remember Me -->
                    <div class="formRow" style="margin-top: -10px;">
                        <br><input type="checkbox" id='rememberme' v-model="rememberme">
                        <label for="rememberme" style="font-weight: 100;">&nbsp;Remember Me</label>
                    </div>
                    <!-- Error Message -->
                    <div v-if="errorMessage" class="error-message">
                        {{ errorMessage }}
                    </div>
                    <center>
                        <br><button type="submit" style="width:80%;" class="buttonSubmit">Login</button>
                        <!-- click to go to register or forget pw page -->
                        <p style="margin-top: 10px;" class="greyText">
                            <router-link to='/forgetPw' id="forgetPw">Forget Password?</router-link><br>
                            Are you a new user? Register <router-link to='/register'
                                style="color: var(--secondary) !important;">here</router-link>
                        </p>
                    </center>
                </form>
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
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import NavBar from '@/components/NavBar.vue';

// Initialize Firebase
initializeApp(firebaseConfig);

export default {
    name: 'login',
    components: {
        NavBar
    },
    data() {
        return {
            email: '',
            password: '',
            rememberme: false,
            errorMessage: '' // Add error message state
        };
    },
    methods: {
        async logIn() {
            try {
                const auth = getAuth();
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;
                console.log("Successfully logged in");
                console.log(user.displayName);
                this.$router.push("/");
            } catch (error) {
                console.log(error.code);
                console.log(error.message);
                this.handleError(error.code); // Handle the error
            }
        },
        handleError(errorCode) {
            switch (errorCode) {
                case 'auth/invalid-email':
                    this.errorMessage = 'Invalid email.';
                    break;
                // case 'auth/user-disabled':
                //     this.errorMessage = 'This user has been disabled.';
                //     break;
                // case 'auth/user-not-found':
                //     this.errorMessage = 'No user found with this email.';
                //     break;
                case 'auth/invalid-credential':
                    this.errorMessage = 'Incorrect password.';
                    break;
                case 'auth/too-many-requests':
                    this.errorMessage = 'Too many log in attempts. Please try again later.';
                    break;
                default:
                    this.errorMessage = 'Login failed. Please try again.';
            }
        }
    }
};
</script>

<style>
/* Add styles for error message */
.error-message {
    color: red;
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