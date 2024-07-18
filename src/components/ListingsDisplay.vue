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
            <v-card class="mx-1" height="280" width="417" rounded="xl"  @click="navigateToListing(listing.listingID)">
              <v-img :src="listing.url" height="174px" cover></v-img>
              <v-btn flat icon="mdi-bookmark" base-color="transparent" size="50" class="bookmark-icon" @click.stop.prevent="bookmarkListing(listing)">
                <v-icon icon="mdi-bookmark-outline" size="50" color="var(--primary)"></v-icon>
              </v-btn>
              <v-card-title>{{ listing.name }}</v-card-title>
              <v-card-title class="location">{{ listing.details }}</v-card-title>
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

// console.log(this.$user);

  export default {
    name: 'ListingsDisplay',
    data: () => ({
      listings: [],
      currentIndex: 0,
      outings: [],
    }),
    props: ['user'],
    async created() {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'outings'));
      
      const outings = [];
      querySnapshot.forEach((doc) => {
        const outing_details = doc.data();
        const price = outing_details.max_price === 0 ? 'Free' : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
        outings.push({
          listingID: doc.id,
          name: outing_details.name,
          details: outing_details.location,
          price: price,
          url: outing_details.images.length > 0 ? outing_details.images[0] : null,
        });
      });
  
      this.outings = shuffle(outings);
      this.loadMoreListings();
    },
    methods: {
      loadMoreListings({ done } = {}) {
        const newIndex = this.currentIndex + 10;
        this.listings.push(...this.outings.slice(this.currentIndex, newIndex));
        this.currentIndex = newIndex;
        if (done) done('ok');
      },
      navigateToListing(listingID) {
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
      bookmarkListing(listing) {
        console.log('Bookmark clicked for:', listing);
        // Implement bookmark functionality here
        console.log(this.user);
        
        if (this.user) {
          // Bookmark the listing
          console.log('bookmarked');
        } else {
          // Show login dialog
          alert('Please login to save outings');
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

.hideScroll {
    scrollbar-width: none;
}

  </style>
  