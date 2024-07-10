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

// get listingID

// const docRef = doc(db, "outings", listingID);
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//     var outing_details = docSnap.data();;
// } else {
//   // docSnap.data() will be undefined in this case
//     console.log("error 404: outing not found");
// }
//     export default {
//     name: 'ListingInformation',
//     components: ImageCarousel,
//     components: { ImageCarousel }
    
// }
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