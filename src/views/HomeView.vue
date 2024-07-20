<template>
  <div>
    <NavBar />
  </div>
  
  <div class="content">

    <div class="carousel">
      <ImageCarousel :slides="home_slides" carousel_height="520"/>
    </div>

    <div class="CategoryBar">
      <CategorySelector />
    </div>

    <div class='benefits'>
      <v-row>
        <v-col class='benefitsCol'>
          <img src="../assets/icons/gif/explore.gif">
          <h4><b>Discover Novel Experiences</b></h4>
          <p>
            Explore unique hangout spots, events, festivals, and date activities in Singapore, helping users explore new experiences and enrich their social lives.          
          </p>
        </v-col>

        <v-col class='benefitsCol'>
          <img src="../assets/icons/gif/recommendation.gif">
          <h4><b>Personalized Recommendations</b></h4>
          <p>
            Personalized suggestions aligned with user preferences, ensuring each recommendation is tailored to individual tastes and enhancing the enjoyment of outings.       
          </p>
        </v-col>

        <v-col class='benefitsCol'>
          <img src="../assets/icons/gif/planning.gif">
          <h4><b>Efficient Planning</b></h4>
          <p>
            Simplify outing planning with a user-friendly interface and comprehensive information, saving time and allowing users to focus on enjoying Singapore's vibrant social scene.       
          </p>
        </v-col>
      </v-row>
    </div>
    
    <div class="text-h5 pl-16" style='text-align:center;'>
      <b>Recommendation</b>
      <p style='font-size: 16px;'>
        Tailored suggestions based on user preferences, ensuring each recommendation matches individual interests for a more satisfying outing experience.        
      </p>
    </div>
    <div v-if="user" class="ListingDisplay">
      <!-- <component :is="dynamicComponent" /> -->
      <ListingRecommend :user="user"/>
    </div>

    <div v-else class="ListingDisplay">
      <ListingsDisplay :user="user"/>
    </div>
  </div>
  
  <OutingSGFooter />
</template>

<script>
  import CategorySelector from '@/components/CategorySelector.vue';
  import ImageCarousel from '@/components/ImageCarousel.vue';
  import ListingRecommend from '@/components/ListingsRecommend.vue';
  import ListingsDisplay from '@/components/ListingsDisplay.vue';
  import NavBar from '@/components/NavBar.vue';
  import OutingSGFooter from '@/components/Footer.vue';

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
  import firebaseConfig from './../../firebase/firebaseConfig.js';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);
  
  export default {
    data() {
      return {
        user: auth.currentUser,
        home_slides: [
            {listingID: "AekfjMatGlgj9U7XiYoP", url: "https://firebasestorage.googleapis.com/v0/b/outingsg.appspot.com/o/AekfjMatGlgj9U7XiYoP%2Fchildrens-festival-gardens-by-the-bay-kailedoscope-of-memories.jpg?alt=media&token=b8660fee-c4eb-4886-abda-435f1a1dcf6c"},
            {listingID: "HaeFFaI2OGB4CDLLNhQ0", url: "https://firebasestorage.googleapis.com/v0/b/outingsg.appspot.com/o/Resorts%20World%20Sentosa%2FResorts_World_Sentosa.jpg?alt=media&token=d765e643-1e5f-4c6e-b5fb-594b2c098489"},
            {listingID: "m22jYiJrR0mzxhw5459L", url: "https://firebasestorage.googleapis.com/v0/b/outingsg.appspot.com/o/Fort%20Canning%20Park%2FFort-Canning-Park.jpg?alt=media&token=322b6345-7eeb-4b19-8f2e-1bc741dc53db"}
          ],
      }
    },
    name: 'home',
    
    components: {
      NavBar,
      ImageCarousel,
      CategorySelector,
      ListingsDisplay,
      ListingRecommend,
      OutingSGFooter
    },
    mounted(){
      window.scrollTo(0, 0);
    }
  }
</script>

<style>
  .carousel {
    margin-top: 55px;
  }

  .content {
    background-color: rgb(252, 243, 231);
  }

  .CategoryBar {
    padding-top: 20px;
    padding-bottom: 30px;
  }

  .benefits {
    background-color: white;
    color: black;
    text-align: center;
    margin-bottom: 60px;
    margin-top: 20px;
  }

  .benefits img {
    width: 90px;
  }

  .benefitsCol {
    padding: 40px 70px !important;
  }
  
</style>
