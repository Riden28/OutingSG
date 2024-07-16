<template>
    <NavBar />

    <div class="content">
        <center>
            <img :src='profilePicture' class="profilePic" width="300px" height="250px">
            <br>
            <label for="username"><img src='../assets/icons/username.png' class="smallIcon"> Username</label>
            <br><input type="text" 
                        id='displayName'
                        :placeholder="displayName"
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
                <input type="checkbox" id="Food and Beverages:" value="Food and Beverages:" v-model="category" />
                <label for="Food and Beverages:">Food and Beverages:</label>
                <br>
                <input type="checkbox" id="Nature" value="Nature" v-model="category" />
                <label for="Nature">Nature</label>
                <br>
                <input type="checkbox" id="Culture and History" value="Culture and History" v-model="category" />
                <label for="Culture and History">Culture and History</label>
                <br>
                <input type="checkbox" id="Entertainment" value="Entertainment" v-model="category" />
                <label for="Entertainment">Entertainment</label>
                <br>
                <input type="checkbox" id="Outdoor Activities" value="Outdoor Activities" v-model="category" />
                <label for="Outdoor Activities">Outdoor Activities</label>
                <br>
                <input type="checkbox" id="Educational" value="Educational" v-model="category" />
                <label for="Educational">Educational</label>
                <br>
                <input type="checkbox" id="Adventure" value="Adventure" v-model="category" />
                <label for="Adventure">Adventure</label>
                <br>
                <input type="checkbox" id="Shopping" value="Shopping" v-model="category" />
                <label for="Shopping">Shopping</label>
                <br>
                <input type="checkbox" id="Wellness" value="Wellness" v-model="category" />
                <label for="Wellness">Wellness</label>
                <br>
                <input type="checkbox" id="Events and Festivals" value="Events and Festivals" v-model="category" />
                <label for="Events and Festivals">Events and Festivals</label>
            </div>

            <br>
            <!-- Cancel and Save buttons -->
            <center>
                <v-row>
                    <v-col>
                        <router-link to="/profile"><button class="cancelButton">Cancel</button></router-link>
                    </v-col>
                    <v-col>
                        <router-link to="/profile"><button @click.stop.prevent="updateDetails">Save Changes</button></router-link>
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
import { getFirestore, collection, doc, getDoc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    name: 'profile',
    components: {
        NavBar,
        Footer
    },
    data() {
        return {
            bio: '',
            category: [],
            profilePicture: "/src/assets/icons/profile.png",
            displayName: ''
        };
    },
    async mounted() {
        await this.getUserDetails();
    },
    methods: {
        async getUserDetails() {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userDetails = docSnap.data();
                    this.displayName = userDetails.displayName || '';
                    this.bio = userDetails.bio || '';
                    this.category = userDetails.category || [];
                    this.profilePicture = userDetails.profilePicture || "/src/assets/icons/profile.png";
                } else {
                    console.log("Error 404: user not found");
                }
            }
        },
        async updateDetails() {
            if (this.category.length < 3) {
                alert("You will need to select a minimum of 3 categories");
                return;
            }

            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, "users"), where("displayName", "==", this.displayName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty && querySnapshot.docs[0].id !== user.uid) {
                    alert("Username already taken. Please choose another one.");
                    return;
                }

                const userId = user.uid;
                const docRef = doc(db, "users", userId);

                await updateDoc(docRef, {
                    displayName: this.displayName,
                    bio: this.bio,
                    category: this.category,
                    profilePicture: this.profilePicture
                });

                console.log("Profile updated successfully");
                this.$router.push("/profile");
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
