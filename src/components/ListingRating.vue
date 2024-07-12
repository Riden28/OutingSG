<template>
  <div class="v-row information">
    <div class="info">
      <img src="../assets/icons/price-icon.png" class='image info' alt="">
      <p>Price</p>
      <p>{{ price }}</p>
    </div>
    <div class="info">
      <img src="../assets/icons/maps-icon.png" class='image info' alt="">
      <p>Location</p>
      <p>{{ outing_details.location }}</p>
    </div>
    <div class="info">
      <img src="../assets/icons/recommended-pax.png" class='image info' alt="">
      <p>Recommended Pax</p>
      <p>{{ rec_pax }}</p>
    </div>
    <div class="info">
      <img src="../assets/icons/rating-icon.png" class='image info' alt="">
      <p>Rating</p>
      <p>4.2 / 5 (92)</p>
    </div>
  </div>

  <div class="v-row description">
    <div class="v-col-7">
      <p>{{ outing_details.description }}</p>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
  name: 'ListingRating',
  props: ['outingID'],
  data() {
    return {
      outing_details: {}
    };
  },
  async mounted() {
    try {
      const docRef = doc(db, "outings", this.outingID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.outing_details = docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
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
  background-color: #EAA843;
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
}

.info {
  width: 150px;
  align-self: start;
  justify-content: center;
  width: 130px;
  padding-top: 20px;
}

p {
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
</style>
