<template>
    <NavBar />
    <div class="cover">
        <form>
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
                    <button class="btn btn-primary listingBtns" role="button" @click.prevent="deleteListing" style='margin-right: 1px;'>
                        <img src='../assets/icons/gif/delete.gif' style='width: 30px;'>
                        <span style='color:black;'> Delete Listing</span>
                    </button>
                    <h3 style='font-weight: 700;'>Edit Outing</h3>
                    <hr>
                    <div class="name">
                        <h5>Outing Name</h5>
                        <input id='outingName' required type="text" v-model="outingName" placeholder="Name Here" class="text-grey formInput">
                    </div>
                    <div class="outing-description">
                        <h5>Outing Description</h5>
                        <textarea id='outingDescription' required v-model="outingDescription" placeholder="Description Here" class="text-grey desc formInput"></textarea>
                    </div>
                </div>
            </div>
            <div class="bottom v-row">
                <div class="v-col-5">
                    <h4> <p style="color:red;"> Current listing images will be overwritten with new uploaded images. <br> Leave empty to retain current images. </p></h4>
                    <!-- here goes the google maps selector -->
                    <!-- <GoogleMaps/> -->
                </div>
                <div class="v-col-7">
                    <div class="row1">
                        <div class="category">
                            <h5>Category</h5>
                            <input id='outingCategory1' type="checkbox" v-model="outingCategory" value="Food and Beverages" /> Food and Beverages
                            <br>
                            <input id='outingCategory2' type="checkbox" v-model="outingCategory" value="Nature" /> Nature
                            <br>
                            <input id='outingCategory3' type="checkbox" v-model="outingCategory" value="Culture and History" /> Culture and History
                            <br>
                            <input id='outingCategory4' type="checkbox" v-model="outingCategory" value="Entertainment" /> Entertainment
                            <br>
                            <input id='outingCategory5' type="checkbox" v-model="outingCategory" value="Outdoor Activities" /> Outdoor Activities
                            <br>
                            <input id='outingCategory6' type="checkbox" v-model="outingCategory" value="Educational" /> Educational
                            <br>
                            <input id='outingCategory7' type="checkbox" v-model="outingCategory" value="Adventure" /> Adventure
                            <br>
                            <input id='outingCategory8' type="checkbox" v-model="outingCategory" value="Shopping" /> Shopping
                            <br>
                            <input id='outingCategory9' type="checkbox" v-model="outingCategory" value="Wellness" /> Wellness
                            <br>
                            <input id='outingCategory10' type="checkbox" v-model="outingCategory" value="Events and Festivals" /> Events and Festivals
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
                            <input type="range" v-model="minRecommendedPax" min="1" max="20" class='ranges' />
                            <p>Minimum pax: {{ minRecommendedPax }}</p>
                            <input type="range" v-model="maxRecommendedPax" min="1" max="20" class='ranges' />
                            <p>Maximum pax: {{ maxRecommendedPax }}</p>
                        </div>
                    </div>
                    <div class="row2">
                        <div class="area">
                        <h5>Region</h5>
                        <label><input id="outingRegion" northChecked type="radio" v-model="outingRegion" value="North" class='ranges' required/> North </label>
                        <br>
                        <label><input id="outingRegion" southChecked type="radio" v-model="outingRegion" value="South" class='ranges' required/> South </label>
                        <br>
                        <label><input id="outingRegion" eastChecked type="radio" v-model="outingRegion" value="East" class='ranges' required/> East </label>
                        <br>
                        <label><input id="outingRegion" westChecked type="radio" v-model="outingRegion" value="West" class='ranges' required/> West </label>
                        <br>
                        <label><input id="outingRegion" centralChecked type="radio" v-model="outingRegion" value="Central" class='ranges' required/> Central </label>
                        </div>
                        <div class="location">
                            <h5>Exact Location: </h5>
                            <input v-model="location" placeholder="location" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="v-row bottom-buttons">
                <router-link to="/" class="cancelButton btn-primary">
                    Cancel
                </router-link>
                <button class="btn btn-primary" @click.prevent="editOuting">
                    Update Outing
                </button>
            </div>
        </form>
    </div>
    <OutingSGFooter />
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import OutingSGFooter from '@/components/Footer.vue';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from '../../firebase/firebaseConfig.js';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default {
    name: 'edit',
    components: {
        NavBar,
        OutingSGFooter,
    },
    data() {
        return {
            listingID: null,
            outingName: '',
            outingDescription: '',
            outingCategory: [],
            outingMinPrice: 0,
            outingMaxPrice: 1000,
            minRecommendedPax: 0,
            maxRecommendedPax: 20,
            outingRegion: "North",
            location: '',
            files: [],
            imageUrl: null,
            images: []
        }
    },
    async mounted() {
        this.listingID = this.$route.params.listingID;
        if (!auth.currentUser) {
            this.$router.push("/login");
        } else {
            const userID = auth.currentUser.uid;
            const docRef = doc(db, "users", userID);
            const docSnap = await getDoc(docRef);
            const userCreatedListings = docSnap.data().created;
            if (!userCreatedListings.includes(this.listingID)) {
                this.$router.push("/");
            }
        }
        // Retrieve all previous data of listing and instantiate them to the data
        const docRef = doc(db, "outings", this.listingID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        this.outingName = data.name;
        this.outingDescription = data.description;
        this.outingCategory = data.category;
        this.outingMinPrice = data.min_price;
        this.outingMaxPrice = data.max_price;
        this.minRecommendedPax = data.min_recommended_pax;
        this.maxRecommendedPax = data.max_recommended_pax;
        this.outingRegion = data.Region;
        this.location = data.location;
        this.images = data.images;
    },
    methods: {
        async editOuting() {
            const docData = {
                name: this.outingName,
                description: this.outingDescription,
                category: this.outingCategory,
                min_price: parseInt(this.outingMinPrice),
                max_price: parseInt(this.outingMaxPrice),
                min_recommended_pax: parseInt(this.minRecommendedPax),
                max_recommended_pax: parseInt(this.maxRecommendedPax),
                location: this.location,
                Region: this.outingRegion,
            };

            if (docData.min_price > docData.max_price || docData.min_recommended_pax > docData.max_recommended_pax) {
                alert("Minimum value cannot be more than maximum value");
                return;
            }

            if (this.files.length != 0) {
                await this.editImages(docData);
            } else {
                await updateDoc(doc(db, "outings", this.listingID), docData);
                console.log('Document successfully updated');
                this.$router.push("/listing/" + this.listingID);
            }
            },
        async editImages(docData){
            // File upload logic
            const uploadPromises = this.files.map(file => {
                const storageRef = ref(storage, `${this.listingID}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                        },
                        (error) => {
                            console.error('Upload failed:', error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                    );
                });
            });
            try {
                const downloadURLs = await Promise.all(uploadPromises);
                await updateDoc(doc(db, "outings", this.listingID), {
                    ...docData,
                    images: downloadURLs,
                });
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
        },
        deleteListing (){
            if (confirm("Are you sure you want to delete this listing?")) {
                console.log("confirm");
            } else {
                console.log("cancel");
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
      color: black !important;
      width: 100%;
      border-radius: 5px;
    }
    .desc {
      height: 200px;
      padding: 10px;
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

    .listingBtns {
        background-color: white;
        margin-right: -20px;
        margin-left: 20px;
        float: right;
        padding: 10px 20px;
    }
    .listingBtns:hover {
        background-color: white !important;
        border: solid black;
    }
  </style>
  