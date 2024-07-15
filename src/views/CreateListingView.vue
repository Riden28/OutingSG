<template> 
    <NavBar /> 
    <div class="cover">
    <form action="">
      <div class="top v-row">
        <div class="v-col-5 images">
          <button class="btn btn-info" @click="onPickFile">
            <input 
              type="file"
              multiple
              name="file"
              ref="fileInput"
              class="hidden-input"
              @change="onFilePicked"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </button>
        </div>
        <div id="preview">
          <img v-if="url" :src="url" />
        </div>
        <div class="v-col-7">
          <h3>Create Outing</h3>
          <br>
          <div class="name">
            <h6>Outing Name</h6>
            <input id='outingName' type="text" v-model="text" placeholder="Name Here" class="text-grey">
          </div>
          <div class="outing-description">
            <h6>Outing Description</h6>
            <input id='outingDescription' type="text" v-model="text" placeholder="Description Here" class="text-grey desc">
          </div>
        </div>
      </div>
      <div class="bottom v-row">
        <div class="v-col-5">
          <!-- here goes the google maps selector -->
          <!-- <GoogleMaps/> -->
        </div>

        <div class="v-col-7">
          <div class="row1">
            <div class="category">
              <h4>Category</h4>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="food'" false-value="no"/> F&B
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="nature" false-value="null"/> Nature
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="cultural" false-value="null"/> Cultural
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="entertainment" false-value="null"/> Entertainment
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="outdoor" false-value="null"/> Outdoor
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="educational" false-value="null"/> Educational
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="adventure" false-value="null"/> Adventure
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="shopping" false-value="null"/> Shopping
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="wellness" false-value="null"/> Wellness
              <br>
              <input id='outingCategory[]' type="checkbox" v-model="toggle" true-value="events" false-value="null"/> Events
              <br>
            </div>
            <div class="price">
              <h4>Price: </h4>
              <input type="text" placeholder="min price" id="minPrice" v-model="picked" />
              <br><br>
              <input type="text" placeholder="max price" id="maxPrice" v-model="picked" />
            </div>
            <div class="recommended-pax">
              <h4>Min Recommended Pax</h4>
              <input type="range" v-model="minRecommendedPax" min="1" max="20" />
              <p>Number: {{ minRecommendedPax }}</p>
              <input type="range" v-model="maxRecommendedPax" min="1" max="20" />
              <p>Number: {{ maxRecommendedPax }}</p>
            </div> 
          </div>
          <div class="row2">
            <div class="area">
              <h4>Location</h4>
              <label><input id="outlingLocation" type="radio" v-model="outlingLocation" value="north"/> North </label>
              <br>
              <label><input id="outlingLocation" type="radio" v-model="outlingLocation" value="south"/> South </label>
              <br>
              <label><input id="outlingLocation" type="radio" v-model="outlingLocation" value="east"/> East </label>
              <br>
              <label><input id="outlingLocation" type="radio" v-model="outlingLocation" value="west"/> West </label>
              <br>
              <label><input id="outlingLocation" type="radio" v-model="outlingLocation" value="central"/> Central </label>
            </div>
            <div class="location">
              <h4>Exact Location: </h4>
              <input v-model="message" value = [] placeholder="location" />
            </div>
          </div>
        </div>
      </div>
      <div class="v-row bottom-buttons">
        <router-link to="/" class="btn btn-primary">
          Cancel
        </router-link>
        <button v-on:submit.prevent="createOuting" class="btn btn-primary" type = "submit">
          Post Outing
        </button>
      </div>

    </form>
  </div>
    <OutingSGFooter/>
</template> 
 
<script> 
  import NavBar from '@/components/NavBar.vue'; 
  import OutingSGFooter from '@/components/Footer.vue';
  import GoogleMaps from '@/components/GoogleMaps.vue';
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
  import firebaseConfig from '../../firebase/firebaseConfig.js';

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

//   const docData = {
//     stringExample: "Hello world!",
//     booleanExample: true,
//     numberExample: 3.14159265,
//     // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
//     arrayExample: [5, true, "hello"],
//     nullExample: null,
//     objectExample: {
//         a: 5,
//         b: {
//             nested: "foo"
//         }
//     }
// };

// await setDoc(doc(db, "outings", "one"), docData).then(() => {
//     console.log("Document successfully written!");
// });

  export default { 
    name: 'create', 
    components: { 
      NavBar,
      OutingSGFooter,
      GoogleMaps,
      
    }, 
    data() {
      return {
        outingName: '',
        outingDescription: '',
        outingCategory: [],
        outingMinPrice: 0,
        outingMaxPrice: 1000,
        minRecommendedPax: 0,
        maxRecommendedPax: 20,
        outlingLocation: null

      }
    },
    method: {
      async createOuting() {
        const docData = {
          outingName: this.outingName,
          outingDescription: this.outingDescription,
          outingCategory: this.outingCategory,
          outingMinPrice: this.outingMinPrice,
          outingMaxPrice: this.outingMaxPrice,
          outingMinRecommendedPax: this.minRecommendedPax,
          outingMaxRecommendedPax: this.maxRecommendedPax,
          outlingLocation: this.outlingLocation,
        };
        await addDoc(doc(db, "outings"), docData).then(() => {
            console.log("Document successfully written!");
            this.$router.push("/");
        });
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
    
  }; 
  // const setPlace = (place) => {
  //     coords.value.lat = place.geometry.location.lat()
  //     coords.value.lng = place.geometry.location.lng()
  //     // Update the location details
  //     locationDetails.value.address = place.formatted_address
  //     locationDetails.value.url = place.url
  //   }
    
</script>

<style scoped>
  .cover {
    background-color: rgb(237, 231, 230);
  }
  input, .category {
    color: black;
  }
  .v-row {
    width: 100%;
  }
  .v-col-7 {
    color:black;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .row2 {
    display: flex;
    justify-content: start;
  }
  label {
    margin-right: 10px;
  }
  .location {
    margin-left: 3rem;
  }
  .text-grey {
      color: white !important;
      background: lightgray !important;
      width: 100%;
      border-radius: 25px;
    }

    .desc {
      height: 200px;
    }

    .images {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bottom-buttons {
      display: flex;
      justify-content: space-around;
      padding-bottom: 100px;
    }
</style>
