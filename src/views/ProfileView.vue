<template>
    <NavBar />
    <div class="content">
        <router-link to="/settings">
            <p><img src="../assets/icons/settings.png" class="settings"></p>
        </router-link>
        <center style="clear:both;">
            <img :src='profilePicture' class="profilePic" width="300px" height="250px">
        </center>
        <h3 class="titles"> {{ username }}</h3>
        <div class="aboutYou">
            <h4>About You</h4>
            <router-link to="/editProfile">
                <button class="editProfile">Edit Profile</button>
            </router-link>
            <hr style="clear:both;">
            <h5>Bio</h5>
            <p>{{ bio }}</p>
            <br>
            <h5>Category Preferences</h5>
            <p>
            <span v-for="(category, index) in categoryPreferences" :key="index">
                {{ category }}
                <span v-if="index != categoryPreferences.length - 1">, </span>
            </span>
            </p>
            <br>
            <v-row>
                <v-col>
                    <center>
                        <img src="../assets/icons/history.png" class="icons"><br>
                        <router-link to="/myHistory">
                            <button>Outings View History</button>
                        </router-link>
                    </center>
                </v-col>
                <v-col>
                    <center>
                        <img src="../assets/icons/created.png" class="icons"><br>
                        <router-link to="/created">
                            <button>Created Outings</button>
                        </router-link>
                    </center>
                </v-col>
                <v-col>
                    <center>
                        <img src="../assets/icons/review.png" class="icons"><br>
                        <router-link to="/myReviews">
                            <button>Your Reviews</button>
                        </router-link>
                    </center>
                </v-col>
            </v-row>
        </div>
    </div>
    <Footer />
</template>

<script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    name: 'Profile',
    components: {
        NavBar, Footer
    },
    data() {
        return {
            username: "Username here",
            bio: "yadyaydgwygwkgnlwrkngkaerngjkrejk",
            categoryPreferences: "F&B, Education, Wellness",
            profilePicture: "",
        };
    },
    methods: {
        async getUserDetails() {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userDetails = docSnap.data();
                        this.username = userDetails.displayName;
                        this.bio = userDetails.bio;
                        this.categoryPreferences = userDetails.category;
                        this.profilePicture = userDetails.profilePicture;
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("No user is signed in.");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }
    },
    async mounted() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await this.getUserDetails();
            } else {
                console.log("User not signed in");
            }
        });
    }
};
</script>

<style scoped>
.content {
    margin-top: 60px;
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

.editProfile {
    float:right;
    margin-top: -50px;
}

.settings {
    float: right;
    width: 40px;
    margin: 15px 15px 0px 0px;
}
</style>