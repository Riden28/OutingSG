<template>
    <v-row class="my-review-row" dense>
      <v-col cols="4">
        <v-card class="mx-1" height="280" rounded="xl" @click="navigateToListing(this.reviewID)">
          <v-img :src="image" height="174px" cover></v-img>
          <v-btn
            flat
            border="0"
            :icon="getIcon()"
            base-color="transparent"
            @click.stop.prevent="bookmarkListing(this.reviewID)"
            @mouseover="onMouseOver"
            @mouseleave="onMouseLeave"
          >
            <v-icon :icon="getIcon()" size="50" color="var(--primary)" class="bookmark-icon"></v-icon>
          </v-btn>
          <v-card-title>{{ outing.name }}</v-card-title>
          <v-card-text class="location">{{ outing.location }}</v-card-text>
          <v-card-title class="price">{{ price }}</v-card-title>
        </v-card>
      </v-col>
  
      <v-col cols="7" class="reviews">
        <div class="v-row labels">
          <div class="v-col-4 review-header">
            <h4 class="display-name">{{ displayName }}</h4>
            <div class="stars">
              <span v-for="n in 5" :key="n" class="fa fa-star" :class="{ 'checked': n <= review.rating }"></span>
            </div>
          </div>
          <div class="v-col-8">
            <div class="date">
              <p>{{ review.date ? new Date(review.date.seconds * 1000).toLocaleDateString() : '' }}</p>
            </div>
          </div>
        </div>
        <div class="description">
          <p>{{ review.review }}</p>
        </div>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import firebaseConfig from './../../firebase/firebaseConfig.js';
  import Review from "./Review.vue";
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'MyReview',
    data() {
      return {
        review: {},
        displayName: '',
        outing: {},
        price: '',
        image: '',
        bookmarked: false,
        hovering: false,
      };
    },
    props: {
      reviewID: {
        type: String,
        required: true
      }
    },
    components: {
      Review
    },
    async mounted() {
      await this.loadReview();
      await this.retrieveOuting();
    },
    methods: {
      async retrieveOuting() {
        const outingRef = doc(db, "outings", this.reviewID);
        const outingDoc = await getDoc(outingRef);
        if (outingDoc.exists()) {
          this.outing = outingDoc.data();
        } else {
          console.error("Outing document not found");
        }
        this.price = this.outing.max_price === 0 ? "Free" : `$${this.outing.min_price} ~ $${this.outing.max_price}`;
        this.image = this.outing.images[0];
      },
      async loadReview() {
        try {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            this.displayName = userData.displayName;
            const savedOutings = userData.savedOutings || [];
            if (savedOutings.includes(this.reviewID)) {
              this.bookmarked = true;
            }
          } else {
            console.error("User document not found");
            return;
          }
  
          const reviewID = this.reviewID;
          const userID = auth.currentUser.uid;
          const reviewDocRef = doc(db, "outings", reviewID, "reviews", userID);
          const reviewDocSnap = await getDoc(reviewDocRef);
          if (reviewDocSnap.exists()) {
            this.review = reviewDocSnap.data()
          } else {
            console.error("Review document not found for this user");
          }
        } catch (error) {
          console.error("Error loading review:", error);
        }
      },
      navigateToListing(listingID) {
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
      async bookmarkListing(listing) {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          try {
            if (this.bookmarked) {
              await updateDoc(userDocRef, {
                savedOutings: arrayRemove(this.reviewID)
              });
            } else {
              await updateDoc(userDocRef, {
                savedOutings: arrayUnion(this.reviewID)
              });
            }
            this.bookmarked = !this.bookmarked;
          } catch (error) {
            console.error('Error updating document:', error);
          }
        }
      },
      onMouseOver() {
        this.hovering = true;
      },
      onMouseLeave() {
        this.hovering = false;
      },
      getIcon() {
        if (this.hovering) {
          return this.bookmarked ? 'mdi-bookmark-outline' : 'mdi-bookmark';
        }
        return this.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline';
      }
    }
  };
  </script>
  
  <style scoped>
  .v-btn {
    position: absolute;
    top: -6px;
    right: 8px;
  }
  
  .checked {
    color: orange;
  }
  
  .price {
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-weight: normal;
  }
  
  .location {
    position: absolute;
    left: 0px;
    bottom: 0px;
    font-weight: normal;
  }
  
  .v-card:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  
  .my-review-row {
    display: flex;
    justify-content: space-evenly
  }
  
  .reviews {
    background-color: white;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  
  .display-name {
    align-content: center;
  }
  
  .labels {
    display: flex;
    justify-content: space-around;
    padding: 10px;
  }
  
  .v-col-8 {
    display: flex;
    justify-content: end;
  }
  
  .review-header {
    display: flex;
    justify-content: space-around;
  }
  
  .stars {
    display: flex;
    align-items: center;
  }
  
  .description {
    padding: 10px 30px 10px 30px;
  }
  
  .date {
    padding-right: 30px;
    font-size: 13px;
    color: rgb(166, 166, 166);
  }
  
  h4 {
    font-weight: 700;
    justify-content: center;
    align-items: center;
  }
  </style>
  