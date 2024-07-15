<template>
    <div class="names">
        <div class=" categoryname">
            <p>{{outing_details.category}}</p>
        </div>
        <!-- row for outing name & edit outing button -->
        <div class="edit">
          <div class="outingname">
            <p class="outing-name">{{outing_details.name}}</p>
          </div>
          <div>
            <router-link to="/edit" class="btn btn-primary" role="button">Edit Listing</router-link>
          </div>
        </div>

        <!-- row for location name -->
        <div class="v-row">
            <div class="v-col-10 outingname">
                <p class="outingname">{{outing_details.location}}</p>
            </div>
        </div>
    </div>
    <div>
    <ImageCarousel :slides="carousel_images" carousel_height="415"/>
    </div>

</template>

<script>
import ImageCarousel from './ImageCarousel.vue';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    name: 'ListingInformation',
    props: ['outingID'],
    components: {
        ImageCarousel
    },
    data() {
        return {
            outing_details: {
                name: '',
                category: '',
                location: '',
                description: '',
                images: []
            },
            carousel_images: []
        }
    },
    async mounted() {
    try {
        const docRef = doc(db, "outings", this.outingID);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            this.outing_details = docSnap.data();
            console.log(this.outing_details.images);
            for (let image of this.outing_details.images) {
                console.log(image);
                this.carousel_images.push({
                    url: image
                });
            }
            
        } else {
        console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
    },
}
</script>

<style scoped>
    .outing-name {
        font-weight: bold;
    }

    p {
        font-family: sans-serif;
        color: black;
    }

    p .outingname {
      size: 100px;
    }

    .names{
        padding: 0px 24px 0px 24px;
        margin-top: 100px;
    }

    .edit {
        display: flex;
        justify-content: space-between;
    }
</style>