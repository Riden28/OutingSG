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
                            
                                <v-card-subtitle>
                                    {{ listing.details }}
                                </v-card-subtitle>

                                <v-card-title class="price">
                                    {{ listing.price }}
                                </v-card-title>
                            
                            <!-- replace console.log with function to save outing -->
                            
                        </v-card>
                        
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// get userID through sessions
// var userID
var userID = 'ITw3Xl71OnW3OsoFcfyiKQC6jJG3';
const docRef = doc(db, "users", userID);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    var user_details = docSnap.data();
    var user_preferences = user_details.category.slice(0,5);
    // console.log(user_preferences);
} else {
  // docSnap.data() will be undefined in this case
    console.log("error 404: user not found");
}

const querySnapshot = await getDocs(collection(db, "outings"));
var outings = [];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    var outing_details = doc.data();
    if (outings.categories in user_preferences){
        console.log(outings.categories)
    outings.push({listingID: doc.getId() ,name: outing_details.name, details: outing_details.description, price: outing_details.min_price + '-' +outing_details.max_price, url: outing_details.images[0]})
    }
    // console.log(doc.id, " => ", outing_details.images[0]);
    });

    function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

outings = shuffle(outings);

export default {
    name: 'ListingsDisplay',
    // props() { // pass in listing details

    // },
    data: () => ({
            // retrieve the first 10 listings
            listings: outings[0,1],
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
}

.price {
    position: absolute;
    right: 0px;
    bottom: 0px;
}
</style>