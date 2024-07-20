<template>
    <v-container fluid class="mx-auto overflow-auto">
      <v-infinite-scroll
        height="700"
        color="var(--secondary)"
        mode="manual"
        @load="loadMoreListings"
        empty-text="No more recommended listings"
        load-more-text="RECOMMEND MORE"
        class="hideScroll"
      >
        <v-row align="start" justify="center">
          <v-col v-for="listing in listings" :key="listing.listingID" cols="auto">
            <v-card class="mx-1" height="280" width="417" rounded="xl" @click="navigateToListing(listing.listingID)">
              <v-img :src="listing.url" height="174px" cover></v-img>
              <v-btn flat :icon="listing.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" base-color="transparent" @click.stop.prevent="bookmarkListing(listing)">
                <v-icon :icon="listing.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" size="50" color="var(--primary)" class="bookmark-icon"></v-icon>
              </v-btn>
              <v-card-title>{{ listing.name }}</v-card-title>
              <v-card-text class="location">{{ listing.details }}</v-card-text>
              <v-card-title class="price">{{ listing.price }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-infinite-scroll>
    </v-container>
  </template>
  
  <script>
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, collection, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import firebaseConfig from './../../firebase/firebaseConfig.js';
  import shuffle from "./../../firebase/firebaseAuthServices.js";
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication
  const auth = getAuth(firebaseApp);
  
  // Initialize Cloud Firestore
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'ListingsDisplay',
    data() {
      return {
        listings: [],
        currentIndex: 0,
        outings: [],
        user_preferences: [],
        user: null,
        userID: null,
      };
    },
    async created() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          this.userID = user.uid;
          await this.loadUserPreferences();
        } else {
          this.user = null;
          this.userID = null;
        }
      });
    },
    methods: {
      async loadUserPreferences() {
        if (!this.userID) return;
        const docRef = doc(db, "users", this.userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const user_details = docSnap.data();
          this.user_preferences = user_details.category.slice(0, 3); // Get top 3 preferences
          await this.loadOutings();
        } else {
          console.log("error 404: user not found");
        }
      },
      async loadOutings() {
        const querySnapshot = await getDocs(collection(db, "outings"));
        querySnapshot.forEach((doc) => {
          const outing_details = doc.data();
          for (const preference of this.user_preferences) {
            if (outing_details.category.includes(preference)) {
              let price = outing_details.max_price === 0 ? "Free" : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
              this.outings.push({
                listingID: doc.id,
                name: outing_details.name,
                details: outing_details.location,
                price: price,
                url: outing_details.images.length > 0 ? outing_details.images[0] : null,
                bookmarked: false,
              });
              break;
            }
          }
        });
        await this.checkBookmarkedListings();
        this.outings = shuffle(this.outings);
        this.listings = this.outings.slice(0, 10);
      },
      async checkBookmarkedListings() {
        if (!this.userID) return;
        const userDocRef = doc(db, "users", this.userID);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const savedOutings = userData.savedOutings || [];
          this.outings.forEach(outing => {
            if (savedOutings.includes(outing.listingID)) {
              outing.bookmarked = true;
            }
          });
        }
      },
      loadMoreListings({ done }) {
        setTimeout(() => {
          this.currentIndex += 10;
          const newListings = this.outings.slice(this.currentIndex, this.currentIndex + 10);
          if (newListings.length > 0) {
            this.listings.push(...newListings);
          } else {
            // Show "No more outings to be shown" message
            done('No more outings to be shown');
          }
          if (done) done();
        }, 1000);
      },
      async navigateToListing(listingID) {
        if (this.user) {
          const userDocRef = doc(db, "users", this.userID);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            let listingsHistory = userDocSnap.data().listingsHistory || [];
            
            // Remove the listing if it's already in the history
            listingsHistory = listingsHistory.filter(id => id !== listingID);
            
            // If the array is already at 10 listings, remove the earliest one
            if (listingsHistory.length >= 10) {
              listingsHistory.shift();
            }
  
            // Add the new listingID
            listingsHistory.push(listingID);
  
            // Update the user's document
            await updateDoc(userDocRef, { listingsHistory });
          }
        }
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
      async bookmarkListing(listing) {
        if (!this.user) {
          this.$router.push("/login");
          return;
        }
  
        const userDocRef = doc(db, "users", this.userID);
  
        if (listing.bookmarked) {
          // Remove from bookmarks
          await updateDoc(userDocRef, {
            savedOutings: arrayRemove(listing.listingID)
          });
          listing.bookmarked = false;
        } else {
          // Add to bookmarks
          await updateDoc(userDocRef, {
            savedOutings: arrayUnion(listing.listingID)
          });
          listing.bookmarked = true;
        }
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
    opacity: 0.8; /* Optional: Add hover effect */
    cursor: pointer;
  }
  
  .hideScroll {
    scrollbar-width: none;
  }
  </style>