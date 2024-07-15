<template> 
  <NavBar /> 
  <div class="cover">
    <form @submit.prevent="createOuting">
      <div class="top v-row">
        <div class="v-col-5 images">
          <input
            type="file"
            multiple
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="onFilePicked"
            ref="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        <div id="preview">
          <img v-if="imageUrl" :src="imageUrl" />
        </div>
        <div class="v-col-7">
          <h3>Create Outing</h3>
          <br>
          <div class="name">
            <h6>Outing Name</h6>
            <input id='outingName' required type="text" v-model="outingName" placeholder="Name Here" class="text-grey">
          </div>
          <div class="outing-description">
            <h6>Outing Description</h6>
            <input id='outingDescription' required type="text" v-model="outingDescription" placeholder="Description Here" class="text-grey desc">
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
              <input id='outingCategory1' type="checkbox" v-model="outingCategory" value="food"/> F&B
              <br>
              <input id='outingCategory2' type="checkbox" v-model="outingCategory" value="nature"/> Nature
              <br>
              <input id='outingCategory3' type="checkbox" v-model="outingCategory" value="cultural"/> Cultural
              <br>
              <input id='outingCategory4' type="checkbox" v-model="outingCategory" value="entertainment"/> Entertainment
              <br>
              <input id='outingCategory5' type="checkbox" v-model="outingCategory" value="outdoor"/> Outdoor
              <br>
              <input id='outingCategory6' type="checkbox" v-model="outingCategory" value="educational"/> Educational
              <br>
              <input id='outingCategory7' type="checkbox" v-model="outingCategory" value="adventure"/> Adventure
              <br>
              <input id='outingCategory8' type="checkbox" v-model="outingCategory" value="shopping"/> Shopping
              <br>
              <input id='outingCategory9' type="checkbox" v-model="outingCategory" value="wellness"/> Wellness
              <br>
              <input id='outingCategory10' type="checkbox" v-model="outingCategory" value="events"/> Events
              <br>
            </div>
            <div class="price">
              <h4>Price: </h4>
              <input type="text" required placeholder="min price" id="minPrice" v-model="outingMinPrice" />
              <br><br>
              <input type="text" required placeholder="max price" id="maxPrice" v-model="outingMaxPrice" />
            </div>
            <div class="recommended-pax">
              <h4>Min Recommended Pax</h4>
              <input type="range" v-model="minRecommendedPax" min="1" max="20" />
              <p>Number: {{ minRecommendedPax }}</p>
              <h4>Max Recommended Pax</h4>
              <input type="range" v-model="maxRecommendedPax" min="1" max="20" />
              <p>Number: {{ maxRecommendedPax }}</p>
            </div> 
          </div>
          <div class="row2">
            <div class="area">
              <h4>Location</h4>
              <label><input id="outingLocation1" type="radio" v-model="outingLocation" value="north"/> North </label>
              <br>
              <label><input id="outingLocation2" type="radio" v-model="outingLocation" value="south"/> South </label>
              <br>
              <label><input id="outingLocation3" type="radio" v-model="outingLocation" value="east"/> East </label>
              <br>
              <label><input id="outingLocation4" type="radio" v-model="outingLocation" value="west"/> West </label>
              <br>
              <label><input id="outingLocation5" type="radio" v-model="outingLocation" value="central"/> Central </label>
            </div>
            <div class="location">
              <h4>Exact Location: </h4>
              <input v-model="exactLocation" placeholder="location" />
            </div>
          </div>
        </div>
      </div>
      <div class="v-row bottom-buttons">
        <router-link to="/" class="btn btn-primary">
          Cancel
        </router-link>
        <button class="btn btn-primary" type="submit">
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
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from '../../firebase/firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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
      outingLocation: null,
      exactLocation: '',
      files: [],
      imageUrl: null,
      image: null,
      imageUrls: [],
    }
  },
  methods: {
    async createOuting() {
      const docData = {
        name: this.outingName,
        description: this.outingDescription,
        category: this.outingCategory,
        outingMinPrice: this.outingMinPrice,
        outingMaxPrice: this.outingMaxPrice,
        min_recommended_pax: this.minRecommendedPax,
        max_recommended_pax: this.maxRecommendedPax,
        location: this.outingLocation,
        exactLocation: this.exactLocation,
        images: []
      };

      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, "outings"), docData);
      const docId = docRef.id;

      // File upload logic
      const uploadPromises = this.files.map(file => {
        const storageRef = ref(storage, `./${docId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
              console.error('Upload failed:', error);
              reject(error);
            }, 
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
              });
            }
          );
        });
      });

      try {
        const downloadURLs = await Promise.all(uploadPromises);
        console.log('All files uploaded successfully');

        // Update the document with the image URLs
        await updateDoc(docRef, { imageUrls: downloadURLs });
        console.log('Document successfully updated with image URLs');
        
        this.$router.push("/");
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      this.files = Array.from(event.target.files);
      if (this.files.length > 0) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.imageUrl = fileReader.result;
        };
        fileReader.readAsDataURL(this.files[0]);
      }
    }
  }
}; 
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
