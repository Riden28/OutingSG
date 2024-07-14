<template>
  <div>
    <NavBar />
  </div>
  
  <div class="carousel">
    <ImageCarousel :slides="home_slides"/>
  </div>

  <div class="CategoryBar">
    <CategorySelector />
  </div>
  
  <div class="text-h5 pl-16">Recommendation</div>
  <div v-if="user" class="ListingDisplay">
    <!-- <component :is="dynamicComponent" /> -->
    <ListingRecommend />
  </div>

  <div v-else class="ListingDisplay">
    <ListingsDisplay />
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
            {listingID: "AekfjMatGlgj9U7XiYoP", url: "https://firebasestorage.googleapis.com/v0/b/outingsg.appspot.com/o/Capture.PNG?alt=media&token=469b11ac-4a6c-47ce-9062-254b1bf4cdd4"},
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
  };
</script>

<style>
  .carousel {
    margin-top: 55px;
  }
</style>
