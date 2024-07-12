<template>
    <div class="v-row information">
      <div class="info">
        <img src="../assets/icons/price-icon.png" class='image info' alt="">
        <p>Price</p>
        <p>{{ outing_details.min_price + outing_details.max_price }}</p>
      </div>
      <div class="info">
        <img src="../assets/icons/maps-icon.png" class='image info' alt="">
        <p>Location</p>
        <p>North</p>
      </div>
      <div class="info">
        <img src="../assets/icons/recommended-pax.png" class='image info' alt="">
        <p>Recommended Pax</p>
        <p>10+</p>
      </div>
      <div class="info">
        <img src="../assets/icons/rating-icon.png" class='image info' alt="">
        <p>Rating</p>
        <p>4.2 / 5 (92)</p>
      </div>
    </div>
  
    <div class="v-row description">
      <div class="v-col-7">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus eros sed rhoncus consequat. Fusce et malesuada libero. Pellentesque vel ornare urna. Cras sapien felis, molestie at bibendum sit amet, finibus quis ligula. Sed mattis urna nunc, et iaculis odio suscipit non. Nam cursus diam et arcu gravida suscipit. In non nibh eget neque dapibus posuere vitae quis eros. Fusce luctus vitae enim id maximus. Morbi iaculis lobortis mauris nec tincidunt. In vitae nulla non lectus lacinia finibus id ut velit. Nulla et dapibus mi. Donec sed magna in sem dignissim porttitor.
  
  Sed sed nisl at elit tincidunt vulputate. Nam blandit enim ut turpis ultrices, vel blandit ligula pulvinar. Donec sodales lectus sit amet gravida sodales. Proin tincidunt magna id ullamcorper ultricies. Quisque in condimentum mauris. Donec ac elementum nunc. Donec molestie lorem felis, vitae cursus neque elementum a. Etiam id neque ut ex maximus pharetra. Morbi imperdiet augue vitae ex facilisis, at dapibus nisl laoreet. Sed dapibus libero dolor, id rhoncus felis rutrum vitae. Aenean posuere eros sit amet urna faucibus aliquet.</p>
      </div>
    </div>
  </template>
  
  <script>
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
    name: 'ListingRating',
    props: ['outingID'],
    data() {
      return {
        outing_details: {}
      };
    },
    async mounted() {
      const docRef = doc(db, "outings", this.outingID);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        this.outing_details = docSnap.data();
      }
  
      console.log(this.outing_details);
    }
  };
  </script>
  
  <style scoped>
  .btn-primary {
    background-color: #EAA843;
    color: black;
  }
  
  .information {
    background-color: #EAA843;
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
  }
  
  .info {
    width: 150px;
    align-self: start;
    justify-content: center;
    width: 130px;
    padding-top: 20px;
  }
  
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  img {
    width: 100%;
  }
  
  .v-col-7 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  