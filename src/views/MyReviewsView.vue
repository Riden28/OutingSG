<template>
    <div>
      <NavBar />
    </div>
    
    <div class="content">
        <h2 class="title">Your Reviews</h2>
        <MyReview />
      
      
    </div>
    
    <OutingSGFooter class="footer"/>
  </template>
  
  <script>
    import NavBar from '@/components/NavBar.vue';
    import OutingSGFooter from '@/components/Footer.vue';
    import MyReview from '@/components/MyReview.vue';
    
  
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
    import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
    import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
    import firebaseConfig from '../../firebase/firebaseConfig.js';
  
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

        }
      },
      name: 'myReviews',
      
      components: {
        NavBar,
        OutingSGFooter,
        MyReview
        

      },
    };
  
    console.log(auth.currentUser);
    if (auth.currentUser) {
      console.log('logged in');
    } else {
      console.log('not logged in');
    }
  </script>
  
  <style scoped>

    .content {
      background-color: rgb(252, 243, 231);
      padding-top: 55px;
      padding-left: 20px;
      padding-right: 20px;
    }

    .footer {
      display: flex;
      flex-direction: column;
      margin-bottom: 0px;
      bottom: 0;
      position: fixed;
    }
    
    .title {
      font-weight: 800;
      justify-content: center;
      display: flex;
      padding: 20px;
      margin: 10px;
    }
    
  </style>
  