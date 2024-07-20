<template>
    <v-row class="my-review-row" dense >
        <v-col cols="4">
        <v-card class="mx-1" height="280" rounded="xl" @click="navigateToListing(listing.listingID)">
            <v-img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F88d26018-fa1a-4b92-a8b9-d8ed3f9e178e_3840x2160.png" height="174px" cover></v-img>
            <v-btn flat icon="mdi-bookmark" base-color="transparent" @click.stop.prevent="bookmarkListing(listing)">
            <v-icon icon="mdi-bookmark-outline" size="50" color="var(--primary)" class="bookmark-icon"></v-icon>
            </v-btn>
            <v-card-title>asdf</v-card-title>
            <v-card-text class="location">asdf</v-card-text>
            <v-card-title class="price">adfs</v-card-title>
        </v-card>
        </v-col>

        
        <v-col cols="7" class="reviews">
        <!-- <Review class="review" outingID="FLV3UPsgjfQ0dXyHusJm" /> -->
            <div class="v-row labels">
                <div class="v-col-4 review-header">
                    <!-- <h4>{{ review.displayName.toUpperCase() }}</h4> -->
                    <h4 class="display-name">DISPLAY NAME</h4>
                    <div class="stars">
                        <!-- <span v-for="n in 5" :key="n" class="fa fa-star" :class="{ 'checked': n <= review.rating }"></span> -->
                        <span v-for="n in 5" :key="n" class="fa fa-star checked"></span>
                    </div>
                </div>
                <div class="v-col-8">
                    <div class="date">
                        <!-- <p>{{ new Date(review.date.seconds * 1000).toLocaleDateString() }}</p> -->
                        <p>Date</p>
                    </div>  
                </div>
            </div>
        <div class="description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar ex ultricies nibh porta, a laoreet nibh fringilla. Proin sit amet nisl sit amet ipsum ultrices ullamcorper. Donec eu ultricies lacus. Praesent ornare elit tellus, a ullamcorper arcu viverra a. Cras ultricies dapibus orci vitae rhoncus. Vestibulum egestas porttitor aliquet. Quisque a sapien non lacus cursus placerat et vitae est. Etiam venenatis scelerisque ante, luctus mollis lectus facilisis eu. Integer sit amet ligula pharetra, hendrerit eros quis, molestie tellus. Nam dictum enim non iaculis convallis. Nunc ornare, nibh ac eleifend fermentum, turpis risus porttitor urna, et sollicitudin dui mi eget urna. Fusce nec velit tincidunt, volutpat eros quis, congue enim. Ut eu faucibus lacus. Sed elementum nibh quis augue pretium suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
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
      return {};
    },
    components: {
      Review
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
      navigateToListing(listingID) {
        this.$router.push({ name: 'individualListing', params: { listingID } });
      },
      async bookmarkListing(listing) {
        const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);

                try {
                    if (listing.bookmarked) {
                        // Remove from bookmarks
                        await updateDoc(userDocRef, {
                            savedOutings: arrayRemove(listing.listingID)
                        });
                    } else {
                        // Add to bookmarks
                        await updateDoc(userDocRef, {
                            savedOutings: arrayUnion(listing.listingID)
                        });
                    }

                    // Toggle bookmarked status locally
                    listing.bookmarked = !listing.bookmarked;
                } catch (error) {
                    console.error('Error updating document:', error);
                }
            } else {
                alert('Please login to save outings');
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
    padding-left: 20px;
}
.labels {
    display: flex;
    justify-content: space-around;
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
  