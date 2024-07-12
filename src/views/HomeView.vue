<template>
  <NavBar />
  <ImageCarousel />

  <div class="CategoryBar">
    <CategorySelector />
  </div>
  
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
        user: auth.currentUser
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

</style>
