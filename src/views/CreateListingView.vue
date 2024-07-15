<template> 
  <NavBar /> 
  <div class="cover">
    <form @submit.prevent="createOuting">
      <div class="top v-row">
        <div class="v-col-5 images fileInput">
          <input
            type="file"
            multiple
            required
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
          <h3 style='font-weight: 700;'>Create Outing</h3>
          <hr>
          <br>
          <div class="name">
            <h5>Outing Name</h5>
            <input id='outingName' required type="text" v-model="outingName" placeholder="Name Here" class="text-grey formInput">
          </div>
          <div class="outing-description">
            <h5>Outing Description</h5>
            <input id='outingDescription' required type="text" v-model="outingDescription" placeholder="Description Here" class="text-grey desc formInput">
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
              <h5>Category</h5>
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
              <h5>Price: </h5>
              <input type="number" step="1" required placeholder="min price" id="minPrice" v-model="outingMinPrice" />
              <br><br>
              <input type="number" step="1" required placeholder="max price" id="maxPrice" v-model="outingMaxPrice" />
            </div>
            <div class="recommended-pax">
              <h5>Recommended Pax</h5>
              <input type="range" v-model="minRecommendedPax" min="1" max="20" class='ranges'/>
              <p>Minimum pax: {{ minRecommendedPax }}</p>
              <input type="range" v-model="maxRecommendedPax" min="1" max="20" class='ranges'/>
              <p>Maximum pax: {{ maxRecommendedPax }}</p>
            </div> 
          </div>
          <div class="row2">
            <div class="area">
              <h5>Location</h5>
              <label><input id="outingLocation1" type="radio" selected v-model="outingLocation" value="north" class='ranges'/> North </label>
              <br>
              <label><input id="outingLocation2" type="radio" v-model="outingLocation" value="south" class='ranges'/> South </label>
              <br>
              <label><input id="outingLocation3" type="radio" v-model="outingLocation" value="east" class='ranges'/> East </label>
              <br>
              <label><input id="outingLocation4" type="radio" v-model="outingLocation" value="west" class='ranges'/> West </label>
              <br>
              <label><input id="outingLocation5" type="radio" v-model="outingLocation" value="central" class='ranges'/> Central </label>
            </div>
            <div class="location">
              <h5>Exact Location: </h5>
              <input v-model="exactLocation" placeholder="location" />
            </div>
          </div>
        </div>
      </div>
      <div class="v-row bottom-buttons">
        <router-link to="/" class="cancelButton btn-primary">
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
      images: [],
    }
  },
  methods: {
    async createOuting() {
      const docData = {
        name: this.outingName,
        description: this.outingDescription,
        category: this.outingCategory,
        min_price: parseInt(this.outingMinPrice),
        max_price: parseInt(this.outingMaxPrice),
        min_recommended_pax: parseInt(this.minRecommendedPax),
        max_recommended_pax: parseInt(this.maxRecommendedPax),
        location: this.outingLocation,
        exactLocation: this.exactLocation,
      };

      if (docData.min_price>docData.max_price || docData.min_recommended_pax>docData.max_recommended_pax) {
        alert("Minimum value cannot be more than maximum value");
        return;
      }

      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, "outings"), docData);
      const docId = docRef.id;

      // File upload logic
      const uploadPromises = this.files.map(file => {
        const storageRef = ref(storage, `${docId}/${file.name}`);
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
        await updateDoc(docRef, { images: downloadURLs });
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
    background-color: var(--bg);
    padding-top: 100px;
    padding-left: 30px;
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
    width: 100%;
    border-radius: 5px;
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

  h5 {
    font-weight: 600;
  }

  .ranges {
    accent-color: var(--secondary);
  }

  .btn{
    background-color: var(--secondary);
    border: solid var(--secondary);
    color: white !important;
    padding: 10px 50px 10px 50px;
    text-align: center;
    border-radius: 5px; 
  }

  .btn:hover {
    background-color: var(--transparent);
    border: solid var(--secondary);
    color: black !important;
  }

  .cancelButton {
    background-color: var(--transparent) !important;
    color: black !important;
    border: solid var(--secondary);
    padding: 10px 50px 10px 50px;
    text-align: center;
    border-radius: 5px; 
  }

  .cancelButton:hover {
    background-color: var(--secondary) !important;
    border: solid var(--secondary);
    border-radius: 5px; 
    color: white !important;
    text-decoration: none;
  }

  .fileInput {
    border: solid #d1d1d1;
  }
</style>
