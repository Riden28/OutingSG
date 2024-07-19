<template>
    <div class="names" style="padding-bottom: 30px;">
        <div class="categoryname">
            <span v-for="(category, index) in outing_details.category" :key="index">
                {{ category }}
                <span v-if="index != outing_details.category.length - 1">, </span>
            </span>
        </div>
        <!-- row for outing name & edit outing button -->
        <div class="edit">
            <div class="outingname">
                <h2 class="outing-name"><b>{{ outing_details.name }}</b></h2>
            </div>
            <div>
                <button v-if="showEdit" class="btn btn-primary listingBtns" role="button" @click.prevent="editListing" style='margin-right: 1px;'>
                    <img src='../assets/icons/gif/edit.gif' style='width: 30px;'>
                    <span style='color:black;'> Edit Listing</span>
                </button>
                <p class="btn btn-primary listingBtns" role="button" @click="share">
                    <img src='../assets/icons/gif/share.gif' style='width: 30px;'>
                </p>
            </div>
        </div>
        <!-- row for location name -->
        <div class="v-row">
            <div class="v-col-10 outingname">
                <p class="outingname">Location: {{ outing_details.location }}</p>
            </div>
        </div>
    </div>
    <div>
        <ImageCarousel :slides="carousel_images" carousel_height="415" />
    </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    name: 'ListingInformation',
    components: {
        ImageCarousel
    },
    props: {
        outingID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            outing_details: {
                name: '',
                category: [],
                location: '',
                description: '',
                images: [],
                showWords: false,
            },
            carousel_images: [],
            showEdit: false,
        };
    },
    methods: {
        share() {
            const shareUrl = document.createElement('input');
            const text = window.location.href;
            document.body.appendChild(shareUrl);
            shareUrl.value = text;
            shareUrl.select();
            document.execCommand('copy');
            document.body.removeChild(shareUrl);
        },
        preloadImages(imageUrls) {
            return Promise.all(
                imageUrls.map(url => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = url;
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                })
            );
        },
        preloadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = () => reject();
            });
        },
        editListing() {
            this.$router.push({ name: 'edit', params: { listingID: this.outingID } });
        }
    },
    async mounted() {
        console.log("Mounted hook called");
        const start = performance.now();

        try {
            const docRef = doc(db, "outings", this.outingID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(`Document fetched: ${performance.now() - start} ms`);
                this.outing_details = docSnap.data();
                console.log(`Outing details set: ${performance.now() - start} ms`);

                console.log(this.outing_details.images);
                const imagePromises = this.outing_details.images.map(image => this.preloadImage(image));
                await Promise.all(imagePromises);
                console.log(`Images preloaded: ${performance.now() - start} ms`);

                this.carousel_images = this.outing_details.images.map(image => ({ url: image }));
                console.log(`Carousel images set: ${performance.now() - start} ms`);
            } else {
                console.log("No such document!");
            }

            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists() && userDoc.data().created.includes(this.outingID)) {
                    this.showEdit = true;
                }
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    }
};
</script>

<style scoped>
.outing-name {
    font-weight: bold;
}
p {
    font-family: sans-serif;
    color: black;
}
.names {
    padding: 0px 24px 0px 24px;
    margin-top: 100px;
}
.edit {
    display: flex;
    justify-content: space-between;
}
.btn {
    background-color: var(--secondary);
    border: solid var(--secondary);
    color: white !important;
}
.btn:hover {
    background-color: var(--transparent);
    border: solid var(--secondary);
    color: black !important;
}
.listingBtns {
    background-color: white;
    margin-right: -20px;
    margin-left: 20px;
}
.listingBtns:hover {
    background-color: white !important;
    border: solid black;
}
</style>
