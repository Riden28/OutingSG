<template>
    <div class="names">
        <div class=" categoryname">
            <p>{{outing_details.category}}</p>
        </div>
        <!-- row for outing name & edit outing button -->
        <div class="edit">
          <div class="outingname">
            <p class="outing-name">{{outing_details.name}}</p>
          </div>
          <div>
            <router-link to="/edit" class="btn btn-primary" role="button">Edit Listing</router-link>
          </div>
        </div>

        <!-- row for location name -->
        <div class="v-row">
            <div class="v-col-10 outingname">
                <p class="outingname">{{outing_details.location}}</p>
            </div>
        </div>
    </div>
      <ImageCarousel/>


</template>

<script>

import ImageCarousel from './ImageCarousel.vue';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export default {
    name: 'ListingInformation',
    components: {
        ImageCarousel
    },
    data() {
        return {
            outing_details: {
                name: '',
                category: '',
                location: '',
                description: '',
                images: []
            }
        }
    },
    mounted() {
        this.getOutingDetails();
    },
    methods: {
        async getOutingDetails() {
            const outingId = this.$route.params.id;
            const outingRef = doc(db, 'outings', outingId);
            const outingSnap = await getDoc(outingRef);
            if (outingSnap.exists()) {
                this.outing_details = outingSnap.data();
            }
        }
    }
}
</script>

<style scoped>
    .outing-name {
        font-weight: bold;
    }


    p {
        font-family: sans-serif;
        color: white;
    }

    p .outingname {
      size: 100px;
    }

    .v-carousel {
        padding: 0px 0px 0px 0px !important;
    }
    .names{
        padding: 0px 24px 0px 24px;
    }

    .edit {
        display: flex;
        justify-content: space-between;
    }
</style>