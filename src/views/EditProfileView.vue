<template>
    <NavBar />

    <div class="content">
        <center>
            <img :src='profilePicture' class="profilePic" width="300px" height="250px">
            <br>
            <label for="username"><img src='../assets/icons/username.png' class="smallIcon"> Username</label>
            <br><input type="text" 
                        id='username'
                        placeholder={{displayName}}
                        required 
                        v-model="displayName">
        </center>

        <div class="aboutYou">

            <h4>About You</h4><hr>

            <label for="bio"><h5>Bio</h5></label>
            <br><textarea id='bio'
                        placeholder="Enter your bio"
                        required 
                        v-model="bio"></textarea>
            <br>

            <h5>Category Preferences</h5>
            <div>
                <input type="checkbox" id="Culture and History" value="Food and Beverages" v-model="category" />
                <label for="fnb">Food and Beverages</label>
                <br>
                <input type="checkbox" id="Nature" value="Nature" v-model="category" />
                <label for="Nature">Nature</label>
                <br>
                <input type="checkbox" id="Culture and History" value="Culture and History" v-model="category" />
                <label for="cultural">Culture and History</label>
                <br>
                <input type="checkbox" id="Entertainment" value="Entertainment" v-model="category" />
                <label for="entertainment">Entertainment</label>
                <br>
                <input type="checkbox" id="Outdoor Activities" value="Outdoor Activities" v-model="category" />
                <label for="outdoor">Outdoor Activities</label>
                <br>
                <input type="checkbox" id="Educational" value="Educational" v-model="category" />
                <label for="educational">Educational</label>
                <br>
                <input type="checkbox" id="Adventure" value="Adventure" v-model="category" />
                <label for="adventure">Adventure</label>
                <br>
                <input type="checkbox" id="Shopping" value="Shopping" v-model="category" />
                <label for="shopping">Shopping</label>
                <br>
                <input type="checkbox" id="Wellness" value="Wellness" v-model="category" />
                <label for="wellness">Wellness</label>
                <br>
                <input type="checkbox" id="Events and Festivals" value="Events and Festivals" v-model="category" />
                <label for="events">Events and Festivals</label>
            </div>

            <br>
            <!-- Cancel and Save buttons -->
            <center>
                <v-row>
                    <v-col>
                        <router-link to="/profile"><button class="cancelButton">Cancel</button></router-link>
                    </v-col>
                    <v-col>
                        <router-link to="/profile"><button @click.stop.prevent="updateDetails()">Save Changes</button></router-link>
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

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    // const userId = auth.currentUser.uid;
    // const docRef = doc(db, "users", userId);
    // const docSnap = await getDoc(docRef);
    // const user_details = docSnap.data();
    // console.log(user_details);

    export default {
        name: 'profile',
        components: {
            NavBar
        },
        data() {
            return {
                username: '',
                bio: '',
                categoryPreferences: [],
                profilePicture: "/src/assets/icons/profile.png",
            };
        },
        methods: {
            async getUserDetails(){
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userDetails = docSnap.data();
                        console.log(userDetails);
                        this.displayName = userDetails.displayName;
                        this.bio = userDetails.bio;
                        this.categoryPreferences = userDetails.categoryPreferences;
                        this.profilePicture = userDetails.profilePicture;
                    } else {
                        console.log("error 404: user not found");
                        return;
                    }
                }
            },
            updateDetails(){
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
    }
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

.titles {
    font-weight: 800;
    font-size: 30px;
    text-align: center;
}

.aboutYou {
    padding: 30px;
}

.aboutYou h4, h5 {
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
