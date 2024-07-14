<template>
    <div class="text-h5 pl-16">Recommendation</div>
  
    <v-container fluid class="mx-auto">
      <v-infinite-scroll
        height="700"
        color="var(--secondary)"
        mode="manual"
        @load="loadMoreListings"
        empty-text="No more recommended listings"
      >
        <v-row align="start" justify="center">
          <v-col v-for="listing in listings" :key="listing.listingID" cols="auto" @click="navigateToListing(listing.listingID)">
            <v-card class="mx-1" height="280" width="417" rounded="xl">
              <v-img :src="listing.url" height="174px" cover></v-img>
              <v-btn icon="mdi-bookmark-outline" base-color="transparent" variant="plain" @click.prevent="bookmarkListing(listing)">
                <v-icon icon="mdi-bookmark" size="50" color="white"></v-icon>
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
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
        };
    },
    async created() {
        const user = auth.currentUser;
        const userID = user ? user.uid : null;
        //debugging line
        if (!userID) {
            console.log("error 401: user not authenticated");
            return;
        }
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user_details = docSnap.data();
            this.user_preferences = user_details.category.slice(0, 3);
            this.loadOutings();
        } else {
            console.log("error 404: user not found");
            return;
        }
    },
    methods: {
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
                            url: outing_details.images.length > 0 ? outing_details.images[0] : null
                        });
                        break;
                    }
                }
            });
            this.outings = shuffle(this.outings);
            this.listings = this.outings.slice(0, 10);
        },
        loadMoreListings({ done }) {
            setTimeout(() => {
                this.currentIndex += 10;
                this.listings.push(...this.outings.slice(this.currentIndex, this.currentIndex + 10));
                done('ok');
            }, 1000);
        },
        navigateToListing(listingID) {
            this.$router.push({ name: 'individualListing', params: { listingID } });
        },
        bookmarkListing(listing) {
            console.log('Bookmark clicked for:', listing);
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
</style>
