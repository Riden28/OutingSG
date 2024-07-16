<template>
    <NavBar />

    <div class="content">
        <center>
            <img :src='profilePicture' class="profilePic" width="300px" height="250px">
            <br>
            <label for="username"><img src='../assets/icons/username.png' class="smallIcon"> Username</label>
            <br><input type="text" 
                        id='username'
                        placeholder="Enter your username"
                        required 
                        v-model="username">
        </center>

        <div class="aboutYou">

            <h4>About You</h4><hr>

            <label for="bio"><h5>Bio</h5></label>
            <br><textarea id='bio'
                        placeholder="Enter your bio"
                        required 
                        v-model="bio"/>
            <br>

            <h5>Category Preferences</h5>
            <div>
                <input type="checkbox" id="fnb" value="fnb" v-model="categoryPreferences" />
                <label for="fnb">F&B</label>
                <br>
                <input type="checkbox" id="Nature" value="nature" v-model="categoryPreferences" />
                <label for="nature">Nature</label>
                <br>
                <input type="checkbox" id="cultural" value="cultural" v-model="categoryPreferences" />
                <label for="cultural">Cultural</label>
                <br>
                <input type="checkbox" id="entertainment" value="entertainment" v-model="categoryPreferences" />
                <label for="entertainment">Entertainment</label>
                <br>
                <input type="checkbox" id="outdoor" value="outdoor" v-model="categoryPreferences" />
                <label for="outdoor">Outdoor</label>
                <br>
                <input type="checkbox" id="educational" value="educational" v-model="categoryPreferences" />
                <label for="educational">Educational</label>
                <br>
                <input type="checkbox" id="adventure" value="adventure" v-model="categoryPreferences" />
                <label for="adventure">Adventure</label>
                <br>
                <input type="checkbox" id="shopping" value="shopping" v-model="categoryPreferences" />
                <label for="shopping">Shopping</label>
                <br>
                <input type="checkbox" id="wellness" value="wellness" v-model="categoryPreferences" />
                <label for="wellness">Wellness</label>
                <br>
                <input type="checkbox" id="events" value="events" v-model="categoryPreferences" />
                <label for="events">Events</label>
            </div>

            <br>
            <!-- Cancel and Save buttons -->
            <center>
                <v-row>
                    <v-col>
                        <router-link to="/profile"><button class="cancelButton">Cancel</button></router-link>
                    </v-col>
                    <v-col>
                        <router-link to="/profile"><button @click.stop.prevent="submit()">Save Changes</button></router-link>
                    </v-col>
                </v-row>
            </center>

        </div>
    </div>

    <Footer />
   
</template>

<script>
    import '../assets/main.css';
    import '../assets/bootstrap.css';
    import '../router/bootstrap.js';
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import firebaseConfig from './../../firebase/firebaseConfig.js';

    import NavBar from '@/components/NavBar.vue';

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    export default {
        name: 'profile',
        components: {
            NavBar
        },
        created() {
            this.username = this.$route.query.username
        },
        data() {
            return {
                username: "",
                bio: "yadyaydgwygwkgnlwrkngkaerngjkrejk",
                profilePicture: "/src/assets/icons/profile.png",
                categoryPreferences: [],
            };
        },
        methods: {
            submit(){

                if (this.categoryPreferences.length < 3){
                    alert("You will need to select a minimum of 3 categories")
                }else{
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
                }
                
            }
        },
    };
</script>

<style scoped>
.content {
    margin-top: 120px;
}

.profilePic {
    width: 100%;
    max-width: 250px;
    height: auto;
    margin-top: -50px;
}

.titles{
    font-weight: 800;
    font-size: 30px;
    text-align: center;
}

.aboutYou {
    padding: 30px;
}

.aboutYou h4,h5 {
    font-weight: 800;
}

.icons {
    width: 100px;
}

v-col {
    text-align: center;
}

button {
    padding: 10px 50px 10px 50px;
    background-color: var(--secondary);
    border: solid var(--secondary);
    border-radius: 5px; 
    color: white;
    margin-top: 10px;
}

button:hover {
    background-color: var(--transparent) !important;
    color: black !important;
    border: solid var(--secondary);
}

.cancelButton {
    background-color: var(--transparent) !important;
    color: black !important;
    border: solid var(--secondary);
}

.cancelButton:hover {
    padding: 10px 50px 10px 50px;
    background-color: var(--secondary) !important;
    border: solid var(--secondary);
    border-radius: 5px; 
    color: white !important;
    margin-top: 10px;
}

input {
    background-color:  #f5f5f5;
}

textarea {
    width: 100%;
    height: auto;
    background-color:  #f5f5f5;
    padding: 10px;
}

label {
    padding-left: 5px;
}

</style>