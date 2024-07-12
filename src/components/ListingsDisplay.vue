<template>
    <div class="text-h5 pl-16">Recommendation</div>

    <v-container fluid class="mx-auto">
        <v-infinite-scroll
            height="700"
            color=var(--secondary)
            mode="manual"
            @load="load"
            empty-text="No more recommended listings"
        >
                <v-row align="start" justify="center">
                    <v-col  v-for="listing in listings" cols="auto">
                        <router-link :to= "{name:'listing', state: { outingId: listing.listingID } }">
                        <v-card
                        class="mx-1"
                        height="280"
                        width="417"
                        rounded="xl"
                        :href="listing.listingPage">
                        <v-img
                        :src="listing.url"
                        height="174px"
                        cover
                        ></v-img>
                        <v-btn
                            icon="mdi-bookmark-outline"
                            base-color="transparent"
                            variant="plain"
                            @click.prevent="console.log('hi');"
                        > 
                            <v-icon
                                icon="mdi-bookmark"
                                size="50"
                                color="white"
                
                            ></v-icon>
                        </v-btn>
                        
                                <v-card-title>
                                    {{ listing.name }}
                                </v-card-title>
                            
                                <v-card-title class="location">
                                    {{ listing.details }}
                                </v-card-title>

                                <v-card-title class="price">
                                    {{ listing.price }}
                                </v-card-title>
                            
                            <!-- replace console.log with function to save outing -->
                            
                        </v-card>
                        </router-link>
                    </v-col>
                
                </v-row>
        </v-infinite-scroll>
        </v-container>
</template>


<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import shuffle from "./../../firebase/firebaseAuthServices.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// const docRef = doc(db, "outings", "AekfjMatGlgj9U7XiYoP");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }

const querySnapshot = await getDocs(collection(db, "outings"));
var outings = [];
querySnapshot.forEach((doc) => {
    var outing_details = doc.data();
    
    // Determine the price based on max_price
    let price;
    if (outing_details.max_price === 0) {
        price = "Free";
    } else {
        price = "$" + outing_details.min_price + ' ~ $' + outing_details.max_price;
    }

    outings.push({
        listingID: doc.id,
        name: outing_details.name,
        details: outing_details.location,
        price: price,
        url: outing_details.images.length > 0 ? outing_details.images[0] : null
    });
});

outings = shuffle(outings);


export default {
    name: 'ListingsDisplay',
    // props() { // pass in listing details

    // },
    data: () => ({
            // retrieve the first 10 listings
            listings: outings.slice(0,10),
            currentIndex: 0,
        }),

    methods: {
        // on every load retrieve another 10 listings
      load ({ done }) {
        setTimeout(() => {
            this.currentIndex += 10
            this.listings.push(...
            outings.slice(this.currentIndex, this.listings.length + 10)
    )
        done('ok')
        }, 1000)
      },
    },
}
</script>

<style scoped>
.v-btn {
  position: absolute;
  top: -6px;
  right: 8px;
  /* font-size: 20px; */
}

.price {
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-weight: normal;
}

.location{
    position: absolute;
    left: 0px;
    bottom: 0px;
    font-weight: normal;
}
</style>