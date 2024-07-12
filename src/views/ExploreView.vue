<template>
    <NavBar/>

    <div class="wrapper"> 
        <div class="sidebar"> 
            <h3 class="title">Filters</h3><hr>

            <h4 class="title">Category</h4> 
            <input type="checkbox" id="fnb"><label for="fnb">F&B</label><br>
            <input type="checkbox" id="nature"><label for="fnb">Nature</label><br>
            <input type="checkbox" id="cultural"><label for="fnb">Cultural</label><br>
            <input type="checkbox" id="entertainment"><label for="fnb">Entertainment</label><br>
            <input type="checkbox" id="outdoor"><label for="fnb">Outdoor</label><br>
            <input type="checkbox" id="educational"><label for="fnb">Educational</label><br>
            <input type="checkbox" id="adventure"><label for="fnb">Adventure</label><br>
            <input type="checkbox" id="shopping"><label for="fnb">Shopping</label><br>
            <input type="checkbox" id="wellness"><label for="fnb">Wellness</label><br>
            <input type="checkbox" id="events"><label for="fnb">Events</label><br>

            <h4 class="title">Price</h4> 
            <input type="checkbox" id="price1"><label for="price1">$</label><br>
            <input type="checkbox" id="price2"><label for="price2">$$</label><br>
            <input type="checkbox" id="price3"><label for="price3">$$$</label><br>

            <h4 class="title">Location</h4> 
            <input type="checkbox" id="north"><label for="north">North</label><br>
            <input type="checkbox" id="south"><label for="south">South</label><br>
            <input type="checkbox" id="east"><label for="east">East</label><br>
            <input type="checkbox" id="west"><label for="west">West</label><br>
            <input type="checkbox" id="central"><label for="central">Central</label><br>

            
            <h4 class="title">Recommended Pax</h4> 

            <br><button>Filter</button><br><br>

            <h3 class="title">Sort</h3>
            <select name="sort" id="sort">
                <option value="category">Category</option>
                <option value="price">Price</option>
            </select>
            <img src="../assets/icons/up.png" v-on:click="sorting = false" v-if="sorting" class="sortIcon">
            <img src="../assets/icons/down.png" v-on:click="sorting = true" v-else class="sortIcon">

        </div> 
  
        <div class="main">

            <h2 class="title">Outings</h2>

            <div class="ListingDisplay">
                <v-container fluid class="mx-auto">
                <v-infinite-scroll
                    height="700"
                    color=var(--secondary)
                    mode="manual"
                    @load="load"
                    empty-text="No more recommended listings">
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
                                    cover></v-img>
                                <v-btn
                                    icon="mdi-bookmark-outline"
                                    base-color="transparent"
                                    variant="plain"
                                    @click.prevent="console.log('hi');"> 
                                    <v-icon
                                        icon="mdi-bookmark"
                                        size="50"
                                        color="white"></v-icon>
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
            </div>
        </div> 
    </div> 


    <OutingSGFooter/>
</template>
  
<script>
import NavBar from '@/components/NavBar.vue';
import OutingSGFooter from '@/components/Footer.vue';
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

const querySnapshot = await getDocs(collection(db, "outings"));
var outings = [];
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    var outing_details = doc.data();
    outings.push({name: outing_details.name, details: outing_details.description, url: outing_details.images[0]})
});

export default {
    name: 'explore',
    
    components: {
        NavBar, OutingSGFooter
    },
    data: () => ({
        // retrieve the first 10 listings
        listings: outings.slice(0,10),
        currentIndex: 0,
        sorting: true,
        searchField: new URLSearchParams(window.location.search).get('search'),
    }),
    methods: {
        // on every load retrieve another 10 listings
        load ({ done }) {
            setTimeout(() => {
                this.currentIndex += 10
                this.listings.push(
                    outings.slice(this.currentIndex, this.listings.length + 10)
                )
                done('ok')
            }, 1000)
        },
        searchListings(){

            this.listings = []; // clear the existing array to only have the searched listings
            
            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                var outing_name = outing_details.name.toLowerCase()
                var search_name = this.searchField.toLowerCase()
                
                if(outing_name.includes(search_name)){
                    this.listings.push({name: outing_details.name, details: outing_details.description, url: outing_details.images[0]})
                }
            });
            
            console.log(this.listings);
        }
    },
    created() {

        const navSearch = new URLSearchParams(window.location.search).get('search');

        if (navSearch !== null){
            this.searchListings();
        }
        
    }
};

</script>

<style scoped>

label {
    padding-left: 5px;
    font-weight: 100;
}

.wrapper { 
    display: flex; 
} 

.main { 
    width: 80%; 
    height: 200vh; 
    min-height: 1000px; 
    display: flex; 
    flex-direction: column; 
    background: white; 
    padding-left: 10px; 
    margin-top: 55px;
    padding: 30px;
} 

.sidebar { 
    width: 25%; 
    height: 100vh; 
    min-height: 200px; 
    overflow: auto; 
    background: var(--light-grey);
    position: -webkit-sticky; 
    position: sticky; 
    top: 55px;
    padding: 10px;
    padding-left: 20px;
} 

li { 
    list-style: none;
} 

.title {
    font-weight: 800;
}

select {
    padding: 10px 20px;
    border: 0px;
}

.sortIcon {
    background-color: white;
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
}
  
/* listings style */

.v-btn {
    position: absolute;
    top: -6px;
    right:  8px;
}

.price {
    position: absolute;
    right: 0px;
    bottom: 0px;
}
</style>