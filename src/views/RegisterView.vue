<template>
  
    <NavBar />

    <div class="row">
        <!-- left side of the register page -->
        <div class='rowBackground'>
            <div class="column left">
                <h2>Welcome to</h2>
                <p><img src='../assets/Logo/OutingSG_white.png'></p>
                <p>Singapore, a bustling city-state renowned for its vibrant culture and diverse entertainment options, lacks a comprehensive and user-friendly platform that efficiently recommends hangout spots, upcoming events and festivals, and unique date activities. Locals often struggle to discover novel and exciting experiences within their city, leading to repetitive outings and missed opportunities to explore Singapore's dynamic social scene.</p>
                <br><h4>But with OutingSG, we can solve this problem.</h4>
            </div>
        
            <!-- User register form -->
            <div class="column right">
                <p class='pageTitle'>User Register</p>
                <hr>
                <form id="register">
                    
                    <div class="formRow">
                        <!-- Username -->
                        <div class="formColumn">
                            <p>
                                <label for="username"><img src='../assets/icons/username.png' class="smallIcon"> Username</label>
                                <br><input type="text" 
                                            id='username'
                                            placeholder="Enter your username"
                                            required 
                                            v-model="username">
                                <br>
                            </p>
                        </div>
                    </div>

                    <!-- Email and Number -->
                    <div class="formRow">
                        <!-- Email -->
                        <div class="formColumn">
                            <p>
                                <label for="email"><img src='../assets/icons/email.png' class="smallIcon"> Email</label>
                                <br><input type="email" 
                                            id='email'
                                            placeholder="Enter your email"
                                            required 
                                            v-model="email">
                                <br>
                            </p>
                        </div>

                        <!-- Number -->
                        <div class="formColumn">
                            <p>
                                <label for="mobileNumber"><img src='../assets/icons/mobileNumber.png' class="smallIcon"> Mobile Number</label>
                                <br><input type="tel" 
                                            id='mobileNumber'
                                            placeholder="Enter your mobile no."
                                            required 
                                            v-model="mobileNumber">
                            </p>
                        </div>
                    </div>

                    <!-- Password and Confirmation -->
                    <div class="formRow">
                        <!-- Password -->
                        <div class="formColumn">
                            <p>
                                <label for="password"><img src='../assets/icons/password.png' class="smallIcon"> Password</label>
                                <br><input type="password" 
                                            id='password'
                                            placeholder="Enter your password"
                                            required 
                                            v-model="password">
                                <br>
                            </p>
                        </div>

                        <!-- Confirmation -->
                        <div class="formColumn">
                            <p>
                                <label for="confirmPassword"><img src='../assets/icons/password.png' class="smallIcon"> Confirm Password</label>
                                <br><input type="password" 
                                            id='confirmPassword'
                                            placeholder="Re-type password"
                                            required 
                                            v-model="confirmPassword">
                            </p>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="formRow" style="margin-top: -10px;">
                        <br><input type="checkbox" 
                        id='rememberme'
                        v-model="rememberme">
                        <label for="rememberme" style="font-weight: 100;">&nbsp;Remember Me</label>
                    </div>

                    
                    <center>
                    
                    <!-- <br><button type="submit" @click.stop.prevent="submit()" style="width:80%;">Register</button> -->
                    <!-- <br><router-link to='/editProfile'><button @click="nextpage()" style="width:80%;">Register</button></router-link> -->
                    <br><button @click="toProfile()" style="width:80%;">Register</button>

                    <!-- click to go to login page -->
                    <p style="margin-top: 10px;" class="greyText">
                        Are you an existing user? Login <router-link to='/login' style="color: var(--secondary) !important;">here</router-link>
                    </p>
                    </center>
                    
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import '../assets/main.css';
    import '../assets/bootstrap.css';
    import '../router/bootstrap.js';
    import '../assets/loginRegister.css';
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
    import NavBar from '@/components/NavBar.vue';
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import firebaseConfig from './../../firebase/firebaseConfig.js';

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    export default {
        data(){
            return{
                email: '',
                password: '',
            }
        },
        methods: {
            submit(){
                const auth = getAuth();
                const { email, password } = this;
                createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("Successfully registered")
                })
                .catch((error) => {
                    console.log("Error: ", error.message)
                });
                this.$router.push("./")
            },
            toProfile(){
                this.$router.push({
                    path: '/editProfile', 
                    query: {
                        username: this.username, 
                        email: this.email,
                        mobileNumber: this.mobileNumber,
                        password: this.password
                    }
                })
            }
        },
        name: 'register',
        components: {
            NavBar
        },
    };

    

</script>

<!-- const username = ref("");
const password = ref("");

const logIn = async () => {
    signInWithEmailAndPassword(auth, username.value, password.value)
        .then((data) => {
            console.log("Successfully logged in");
            router.push("/");
        })
        .catch((error) => {
            console.log(error.code); 
            alert(error.message);
        })
}; -->

