<template>
    <v-container fluid class="mx-auto overflow-auto listings-history-container">
      <template v-if="listings.length > 0">
        <v-row align="start" justify="center">
          <v-col v-for="listing in listings" :key="listing.listingID" cols="auto">
            <v-card class="mx-1" height="280" width="417" rounded="xl" @click="navigateToListing(listing.listingID)">
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
      </template>
      <template v-else>
        <div class="no-listings-message">
          No listings history. Start discovering more outings through Explore Outings or the Home Page!
        </div>
      </template>
    </v-container>
  </template>
  
  <script>
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import firebaseConfig from './../../firebase/firebaseConfig.js';
  
  export default {
    name: 'ListingsHistory',
    data() {
      return {
        listings: [],
      };
    },
    props: ['user'],
    async created() {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth();
  
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const listingsHistory = userData.listingsHistory || [];
  
            if (listingsHistory.length > 0) {
              const last10Listings = listingsHistory.slice(-10).reverse(); // Get last 10 viewed listings
  
              const listings = await Promise.all(last10Listings.map(async (listingID) => {
                const listingDocRef = doc(db, 'outings', listingID);
                const listingDocSnap = await getDoc(listingDocRef);
  
                if (listingDocSnap.exists()) {
                  const listingDetails = listingDocSnap.data();
                  const price = listingDetails.max_price === 0 ? 'Free' : `$${listingDetails.min_price} ~ $${listingDetails.max_price}`;
                  return {
                    listingID: listingID,
                    name: listingDetails.name,
                    details: listingDetails.location,
                    price: price,
                    url: listingDetails.images.length > 0 ? listingDetails.images[0] : null,
                  };
                }
              }));
  
              this.listings = listings.filter(listing => listing); // Remove undefined listings if any
            }
          } else {
            console.log("No such user document!");
          }
        }
      });
    },
    methods: {
      navigateToListing(listingID) {
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
      bookmarkListing(listing) {
        console.log('Bookmark clicked for:', listing);
        // Implement bookmark functionality here
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
  
  .no-listings-message {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #555;
    margin-top: 50px; /* Add margin to ensure spacing from navbar */
  }
  
  .listings-history-container {
    padding-top: 100px; /* Add padding to ensure spacing from navbar */
    padding-bottom: 100px; /* Add padding to ensure spacing from footer */
  }
  </style>