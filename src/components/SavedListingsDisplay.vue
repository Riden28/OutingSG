<template>
  <hr><hr><hr>
  <div class="title"><h2 class="title">Saved Outings</h2></div>
  <v-container fluid class="mx-auto">
    <v-infinite-scroll
      height="700"
      color="var(--secondary)"
      mode="manual"
      @load="load"
      empty-text="No more recommended listings"
    >
      <!-- Conditional rendering based on listings array -->
      <div v-if="listings.length > 0">
        <v-row align="start" justify="center">
          <v-col v-for="listing in listings" :key="listing.listingID" cols="auto">
            <v-card class="mx-1" height="280" width="417" rounded="xl">
              <v-img :src="listing.url" height="174px" cover @click="navigateToListing(listing.listingID)"></v-img>
              <v-btn :icon="listing.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" base-color="transparent" variant="plain" @click.prevent="bookmarkListing(listing)">
                <v-icon :icon="listing.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" size="50" color="white"></v-icon>
              </v-btn>
              <v-card-title>{{ listing.name }}</v-card-title>
              <v-card-title class="location">{{ listing.details }}</v-card-title>
              <v-card-title class="price">{{ listing.price }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <p class="text-center">You have no saved outings for now. Browse through our outings at Explore Outings or at the Home Page and start saving!</p>
      </div>
    </v-infinite-scroll>
  </v-container>
</template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import shuffle from "./../../firebase/firebaseAuthServices.js";
import router from "../router/index.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: 'SavedListingsDisplay',
  data() {
    return {
      listings: [],
      currentIndex: 0,
      outings: [],
      userID: null,
      hasMoreOutings: true // Track if there are more outings to load
    };
  },
  created() {
    onAuthStateChanged(getAuth(app), async (user) => {
      if (user) {
        this.userID = user.uid;
        await this.getSavedOutings();
        this.loadMoreListings();
      } else {
        router.push("/login");
      }
    });
  },
  methods: {
    navigateToListing(listingID) {
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
    async getSavedOutings() {
      const userDocRef = doc(db, "users", this.userID);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const savedOutings = userData.savedOutings || [];
        const outings = await this.fetchOutingsDetails(savedOutings);
        this.outings = shuffle(outings);
        // Check if user has no saved outings
        if (savedOutings.length === 0) {
          this.listings = []; // Ensure listings array is empty
        }
      } else {
        console.log("No such document!");
      }
    },
    async fetchOutingsDetails(outingIDs) {
      const outings = [];
      for (const id of outingIDs) {
        const docRef = doc(db, "outings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const outing_details = docSnap.data();
          const price = outing_details.max_price === 0 ? "Free" : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
          outings.push({
            listingID: docSnap.id,
            name: outing_details.name,
            details: outing_details.location,
            price: price,
            url: outing_details.images.length > 0 ? outing_details.images[0] : null,
            bookmarked: true // Assuming you set bookmarked status
          });
        }
      }
      return outings;
    },
    loadMoreListings({ done } = {}) {
      if (!this.hasMoreOutings) {
        if (done) done('no-more');
        return;
      }

      const newIndex = this.currentIndex + 10;
      const newOutings = this.outings.slice(this.currentIndex, newIndex);
      this.listings.push(...newOutings);
      this.currentIndex = newIndex;

      // Check if there are more outings to load
      if (this.currentIndex >= this.outings.length) {
        this.hasMoreOutings = false;
      }

      if (done) done('ok');
    },
    async bookmarkListing(listing) {
      const user = getAuth(app).currentUser;
      if (!user) {
        alert('Please login to save outings');
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      try {
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
      } catch (error) {
        console.error('Error updating document:', error);
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
  right: 0;
  bottom: 0;
  font-weight: normal;
}

.location {
  position: absolute;
  left: 0;
  bottom: 0;
  font-weight: normal;
}

.v-card:hover {
  opacity: 0.8; /* Optional: Add hover effect */
  cursor: pointer;
}

.text-center {
  margin-top: 20px;
}

.title {
  padding-left: 35px;
  display: flex;
  font-weight: 800;
}
</style>