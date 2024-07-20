<template>
    <v-row class="my-review-row" dense >
        <v-col cols="4">
        <v-card class="mx-1" height="280" rounded="xl" @click="navigateToListing(this.reviewID)">
            <v-img :src="image" height="174px" cover></v-img>
            <v-btn flat :icon="bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" base-color="transparent" @click.stop.prevent="bookmarkListing(this.reviewID)">
                <v-icon :icon="bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" size="50" color="var(--primary)" class="bookmark-icon"></v-icon>
              </v-btn>
            <v-card-title>{{ outing.name }}</v-card-title>
            <v-card-text class="location">{{outing.location}}</v-card-text>
            <v-card-title class="price">{{price}}</v-card-title>

        </v-card>
        </v-col>

        
        <v-col cols="7" class="reviews">
        <!-- <Review class="review" outingID="FLV3UPsgjfQ0dXyHusJm" /> -->
            <div class="v-row labels">
                <div class="v-col-4 review-header">
                    <!-- <h4>{{ review.displayName.toUpperCase() }}</h4> -->
                    <h4 class="display-name">{{ displayName }}</h4>
                    <div class="stars">
                        <span v-for="n in 5" :key="n" class="fa fa-star" :class="{ 'checked': n <= review.rating }"></span>
                    </div>
                </div>
                <div class="v-col-8">
                    <div class="date">
                        <!-- <p>{{ new Date(review.date.seconds * 1000).toLocaleDateString() }}</p> -->
                        <p>{{ review.date ? new Date(review.date.seconds * 1000).toLocaleDateString() : '' }}</p>
                    </div>  
                </div>
            </div>
        <div class="description">
            <p>{{review.review}}</p>
        </div>
        </v-col>
    </v-row>
    </template>
  
  <script>
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, collection, doc, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import firebaseConfig from './../../firebase/firebaseConfig.js';
  import shuffle from "./../../firebase/firebaseAuthServices.js";
  import Review from "./Review.vue";
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication
  const auth = getAuth(firebaseApp);
  
  // Initialize Cloud Firestore
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
        bookmarked: false
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
    async mounted(){
        await this.loadReview();
        await this.retrieveOuting();
    },
    methods: {
      async retrieveOuting(){
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
        // Get user displayName
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

        // Get review document from the subcollection within the outings collection
        const reviewID = this.reviewID; // Assuming reviewID is stored in this.reviewID
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
      navigateToListing(listingID) {
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
      async bookmarkListing(listing) {
        const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);

                try {
                    if (this.bookmarked) {
                        // Remove from bookmarks
                        await updateDoc(userDocRef, {
                            savedOutings: arrayRemove(this.reviewID)
                        });
                    } else {
                        // Add to bookmarks
                        await updateDoc(userDocRef, {
                            savedOutings: arrayUnion(this.reviewID)
                        });
                    }

                    // Toggle bookmarked status locally
                    this.bookmarked = !this.bookmarked;
                } catch (error) {
                    console.error('Error updating document:', error);
                }
            }
      }
    }
  }
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
    opacity: 0.8; /* Optional: Add hover effect */
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
    align-items:center;
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
    /* margin-left: -40px; */
    justify-content: center;
    align-items: center;
}
  </style>
  