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
                <form @submit.prevent="submit">
                    
                    <!-- Username -->
                    <v-row>
                        <v-col class='cols'>
                            <p>
                                <label for="username"><img src='../assets/icons/username.png' class="smallIcon"> Username</label>
                                <br><input type="text" 
                                            id='username'
                                            placeholder="Enter your username"
                                            required 
                                            v-model="username"
                                            class='formInput'>
                                <br>
                            </p>
                        </v-col>
                    </v-row>

                    <!-- Email and Number -->
                    <v-row>
                        <v-col class='cols'>
                            <p>
                                <label for="email"><img src='../assets/icons/email.png' class="smallIcon"> Email</label>
                                <br><input type="email" 
                                            id='email'
                                            placeholder="Enter your email"
                                            required 
                                            v-model="email"
                                            class='formInput'>
                                <br>
                            </p>
                        </v-col>
                        <v-col class='cols'>
                            <p>
                                <label for="mobileNumber"><img src='../assets/icons/mobileNumber.png' class="smallIcon"> Mobile Number</label>
                                <br><input type="tel" 
                                            id='mobileNumber'
                                            placeholder="Enter your mobile no."
                                            required 
                                            v-model="mobileNumber"
                                            class='formInput'>
                            </p>
                        </v-col>
                    </v-row>

                    <!-- Password and Confirmation -->
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
                    
                    <!-- Remember Me -->
                    <v-row class='cols'>
                        <br>
                        <input type="checkbox" 
                            id='rememberme'
                            v-model="rememberme">
                        <label for="rememberme" style="font-weight: 100; margin-top: 10px;">&nbsp;Remember Me</label>
                    </v-row>
                    
                    <center>
                    
                    <br><button type="submit" @click.stop.prevent="submit()" style="width:80%;" class='buttonSubmit'>Register</button>

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
    import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
    import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
            async submit() {

                if (this.confirmPassword === this.password){
                    try {
                        const auth = getAuth();
                        const firestore = getFirestore();
                        const { email, password, mobileNumber, username } = this;

                        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;

                        await updateProfile(user, {
                            displayName: username
                        });

                        await setDoc(doc(firestore, "users", user.uid), {
                            displayName: username,
                            phoneNumber: mobileNumber,
                            bio: '',
                            category: [],
                            profilePicture: "https://firebasestorage.googleapis.com/v0/b/outingsg.appspot.com/o/profile-picture-default-png.png?alt=media&token=62cd1ae6-d260-4aa4-93d1-7538b8bd93f1",
                            created: [],
                            savedOutings: [],
                            reviews: []
                        });

                        console.log("Successfully registered");
                        this.$router.push("/editProfile");
                    } catch (error) {
                        console.error("Error: ", error.message);
                        this.errorMessage = error.message;
                        alert(error.message.replace("Firebase: ", ""));
                    }
                }else{
                    alert("Password and confirm password has to be the same.");
                }
                
            }
        },
        name: 'register',
        components: {
            NavBar
        },
    };
</script>

<style scoped>
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

