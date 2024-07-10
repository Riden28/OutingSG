<template> 
    <NavBar /> 
    <div class="cover">
    <form action="">
      <div class="top v-row">
        <div class="v-col-5 images">
          <input
            type="file"
            multiple
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="onFileChange"
            ref="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        <div id="preview">
          <img v-if="url" :src="url" />
        </div>
        <div class="v-col-7">
          <h3>Create Outing</h3>
          <br>
          <div class="name">
            <h6>Outing Name</h6>
            <input type="text" v-model="text" placeholder="Description Here" class="text-grey">
          </div>
          <div class="outing-description">
            <h6>Outing Description</h6>
            <input type="text" v-model="text" placeholder="Description Here" class="text-grey desc">
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
              <input type="checkbox" v-model="toggle" true-value="food'" false-value="no"/> F&B
              <br>
              <input type="checkbox" v-model="toggle" true-value="nature" false-value="null"/> Nature
              <br>
              <input type="checkbox" v-model="toggle" true-value="cultural" false-value="null"/> Cultural
              <br>
              <input type="checkbox" v-model="toggle" true-value="entertainment" false-value="null"/> Entertainment
              <br>
              <input type="checkbox" v-model="toggle" true-value="outdoor" false-value="null"/> Outdoor
              <br>
              <input type="checkbox" v-model="toggle" true-value="educational" false-value="null"/> Educational
              <br>
              <input type="checkbox" v-model="toggle" true-value="adventure" false-value="null"/> Adventure
              <br>
              <input type="checkbox" v-model="toggle" true-value="shopping" false-value="null"/> Shopping
              <br>
              <input type="checkbox" v-model="toggle" true-value="wellness" false-value="null"/> Wellness
              <br>
              <input type="checkbox" v-model="toggle" true-value="events" false-value="null"/> Events
              <br>
            </div>
            <div class="price">
              <h4>Price: {{ picked }}</h4>
              <input type="radio" id="one" value="One" v-model="picked" />
              <label for="one">One</label>

              <input type="radio" id="two" value="Two" v-model="picked" />
              <label for="two">Two</label>

              <input type="radio" id="three" value="Three" v-model="picked" />
              <label for="three">Three</label>
            </div>
            <div class="recommended-pax">
              <h4>Recommended Pax</h4>
              <input type="range" v-model="sliderValue" min="1" max="20" />
              <p>Number: {{ sliderValue }}</p>
            </div>  
          </div>
          <div class="row2">
            <div class="area">
              <h4>Location</h4>
              <input type="checkbox" v-model="toggle" true-value="north" false-value="no"/> North
              <br>
              <input type="checkbox" v-model="toggle" true-value="south" false-value="null"/> South
              <br>
              <input type="checkbox" v-model="toggle" true-value="east" false-value="null"/> East
              <br>
              <input type="checkbox" v-model="toggle" true-value="west" false-value="null"/> West
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
        <button class="btn btn-primary" type = "submit">
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
  import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
        picked: '',
        sliderValue: 20,
        
      }
    },
    
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
