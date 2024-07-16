<template>
    <div class="text-h5 pl-16">Recommendation</div>
    <v-container fluid class="mx-auto">
      <v-infinite-scroll
        height="700"
        color="var(--secondary)"
        mode="manual"
        @load="load"
        empty-text="No more recommended listings"
      >
        <v-row align="start" justify="center">
          <v-col v-for="listing in listings" :key="listing.listingID" cols="auto">
            <router-link :to="{ name: 'listing', state: { outingId: listing.listingID } }">
              <v-card class="mx-1" height="280" width="417" rounded="xl">
                <v-img :src="listing.url" height="174px" cover></v-img>
                <v-btn
                  icon="mdi-bookmark-outline"
                  base-color="transparent"
                  variant="plain"
                  @click.prevent="bookmarkListing(listing.listingID)"
                >
                  <v-icon icon="mdi-bookmark" size="50" color="white"></v-icon>
                </v-btn>
                <v-card-title>{{ listing.name }}</v-card-title>
                <v-card-title class="location">{{ listing.details }}</v-card-title>
                <v-card-title class="price">{{ listing.price }}</v-card-title>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-infinite-scroll>
    </v-container>
  </template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import shuffle from "./../../firebase/firebaseAuthServices.js";
import { useRouter } from "vue-router";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
    const router = useRouter();
    onAuthStateChanged(getAuth(app), async (user) => {
      if (user) {
        this.userID = user.uid;
        await this.getSavedOutings();
        this.loadMoreListings();
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    async getSavedOutings() {
      const userDocRef = doc(getFirestore(app), "users", this.userID);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const savedOutings = userData.savedOutings || [];
        const outings = await this.fetchOutingsDetails(savedOutings);
        this.outings = shuffle(outings);
      } else {
        console.log("No such document!");
      }
    },
    async fetchOutingsDetails(outingIDs) {
      const outings = [];
      for (const id of outingIDs) {
        const docRef = doc(getFirestore(app), "outings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const outing_details = docSnap.data();
          const price = outing_details.max_price === 0 ? "Free" : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
          outings.push({
            listingID: docSnap.id,
            name: outing_details.name,
            details: outing_details.location,
            price: price,
            url: outing_details.images.length > 0 ? outing_details.images[0] : null
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
    bookmarkListing(listingID) {
      console.log('Bookmark clicked for:', listingID);
      // Implement bookmark functionality here
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
</style>