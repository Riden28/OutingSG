<template>
  <v-row class='information'>
    <v-col>
      <img src="../assets/icons/gif/price.gif" class='image info' alt="">
      <h5>Price</h5>
      <p>{{ price }}</p>
    </v-col>
    <v-col>
      <img src="../assets/icons/gif/location.gif" class='image info' alt="">
      <h5>Location</h5>
      <p>{{ outing_details.location }}</p>
    </v-col>
    <v-col>
      <img src="../assets/icons/gif/pax.gif" class='image info' alt="">
      <h5>Recommended Pax</h5>
      <p>{{ rec_pax }} pax</p>
    </v-col>
    <v-col>
      <img src="../assets/icons/gif/rating.gif" class='image info' alt="">
      <h5>Rating</h5>
      <p>{{ ratingText }}</p>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <p style='padding: 100px; line-height: 25px;'>
        <h3>About {{ outing_details.name }}</h3>
        {{ outing_details.description }}
      </p>
    </v-col>
    <v-col>
      <img src='../assets/icons/description.png' style='width: 70%; text-align:right !important;'>
    </v-col>
  </v-row>
</template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: 'ListingRating',
  props: ['outingID'],
  data() {
    return {
      outing_details: {},
      numReviews: 0,
      averageRating: 0
    };
  },
  async mounted() {
    try {
      const docRef = doc(db, "outings", this.outingID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.outing_details = docSnap.data();
        await this.fetchRatings();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  },
  methods: {
    async fetchRatings() {
      try {
        const reviewsRef = collection(db, "outings", this.outingID, "reviews");
        const reviewsSnapshot = await getDocs(reviewsRef);

        let totalRating = 0;
        let count = 0;

        reviewsSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.rating) {
            totalRating += data.rating;
            count += 1;
          }
        });

        this.numReviews = count;
        this.averageRating = count > 0 ? (totalRating / count) : 0;
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  },
  computed: {
    price() {
      if (this.outing_details.max_price === 0) {
        return "Free";
      } else {
        return `$${this.outing_details.min_price} ~ $${this.outing_details.max_price}`;
      }
    },
    rec_pax() {
      return `${this.outing_details.min_recommended_pax} ~ ${this.outing_details.max_recommended_pax}`;
    },
    ratingText() {
      if (this.numReviews === 0) {
        return "No reviews yet";
      } else {
        const roundedRating = this.averageRating % 1 === 0 ? this.averageRating.toFixed(0) : this.averageRating.toFixed(1);
        return `${roundedRating} / 5 (${this.numReviews})`;
      }
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #EAA843;
  color: black;
}

.information {
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  text-align: center;
  padding: 0px !important;
  margin: 0px !important;
}

.info {
  width: 150px;
  align-self: start;
  justify-content: center;
  width: 130px;
  padding-top: 20px;
}

.info p {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

img {
  width: 100%;
}

.v-col-7 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-col img {
  width: 90px;
}

h5, h3 {
  font-weight: 700;
}
</style>