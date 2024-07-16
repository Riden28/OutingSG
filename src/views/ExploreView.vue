<template>
    <NavBar/>

    <div class="wrapper"> 
        <div class="sidebar"> 
            <h3 class="title">Filters</h3>
            <button class='btn' @click.prevent="loadListings()">Reset Filters</button>
            <hr>

            <h4 class="title">Category</h4> 
            <input type="checkbox" v-model="category" value='Food and Beverages' id="Food and Beverages"><label for="Food and Beverages">Food and Beverages</label><br>
            <input type="checkbox" v-model="category" value='Nature' id="Nature"><label for="Nature">Nature</label><br>
            <input type="checkbox" v-model="category" value='Culture and History' id="Culture and History"><label for="Culture and History">Culture and History</label><br>
            <input type="checkbox" v-model="category" value='Entertainment' id="Entertainment"><label for="Entertainment">Entertainment</label><br>
            <input type="checkbox" v-model="category" value='Outdoor Activities' id="Outdoor Activities"><label for="Outdoor Activities">Outdoor Activities</label><br>
            <input type="checkbox" v-model="category" value='Educational' id="Educational"><label for="Educational">Educational</label><br>
            <input type="checkbox" v-model="category" value='Adventure' id="Adventure"><label for="Adventure">Adventure</label><br>
            <input type="checkbox" v-model="category" value='Shopping' id="Shopping"><label for="Shopping">Shopping</label><br>
            <input type="checkbox" v-model="category" value='Wellness' id="Wellness"><label for="Wellness">Wellness</label><br>
            <input type="checkbox" v-model="category" value='Events and Festivals' id="Events and Festivals"><label for="Events and Festivals">Events and Festivals</label><br>

            <h4 class="title">Price</h4> 
            <p>Minimum Price: <input type='number' v-model='minPrice' class='userValues' min="0"></p>
            <input type="range" v-model="minPrice" min="0" class='ranges'/>
            <p>Maximum Price: <input type='number' v-model='maxPrice' class='userValues' min="0"></p>
            <input type="range" v-model="maxPrice" min="0" class='ranges'/>

            <!-- <input type="checkbox" id="price1"><label for="price1">$</label><br>
            <input type="checkbox" id="price2"><label for="price2">$$</label><br>
            <input type="checkbox" id="price3"><label for="price3">$$$</label><br> -->

            <h4 class="title">Location</h4> 
            <input type="checkbox" v-model="location" id="north" value="north"><label for="north">North</label><br>
            <input type="checkbox" v-model="location" id="south" value="south"><label for="south">South</label><br>
            <input type="checkbox" v-model="location" id="east" value="east"><label for="east">East</label><br>
            <input type="checkbox" v-model="location" id="west" value="west"><label for="west">West</label><br>
            <input type="checkbox" v-model="location" id="central" value="central"><label for="central">Central</label><br>

            
            <h4 class="title">Recommended Pax</h4> 
            <p>Minimum Pax: <input type='number' v-model='minPax' class='userValues' min="1"></p>
            <input type="range" v-model="minPax" min="1" class='ranges'/>
            <p>Maximum Pax: <input type='number' v-model='maxPax' class='userValues' min="1"></p>
            <input type="range" v-model="maxPax" min="1" class='ranges'/>
            

            <br><button class='btn' @click.prevent='filter()'>Filter</button><br><br>

            <h3 class="title">Sort</h3>
            <select name="sort" id="sort" class='sort' v-model="selectedSort">
                <option value="name">Listing Name</option>
                <option value="price">Price</option>
            </select>
            <img src="../assets/icons/up.png" v-on:click="sorting = false" v-if="sorting" class="sortIcon">
            <img src="../assets/icons/down.png" v-on:click="sorting = true" v-else class="sortIcon">
            <br><br><button class='btn' @click.prevent="sortListings()">Sort</button>
 

        </div> 
  
        <div class="main">

            <h2 class="title">Outings</h2>

            <v-container fluid class="mx-auto overflow-auto hideScroll">
                <v-row align="start" justify="center">
                    <v-col v-for="listing in listings" :key="listing.listingID" cols="auto" @click="navigateToListing(listing.listingID)">
                        <v-card class="mx-1" height="280" width="417" rounded="xl">
                        <v-img :src="listing.url" height="174px" cover></v-img>
                        <v-btn icon="mdi-bookmark-outline" base-color="transparent" variant="plain" @click.prevent="bookmarkListing(listing)">
                            <v-icon icon="mdi-bookmark" size="50" color="white"></v-icon>
                        </v-btn>
                        <v-card-title>{{ listing.name }}</v-card-title>
                        <v-card-title class="location">{{ listing.details }}</v-card-title>
                        <v-card-title class="price">{{ listing.price }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
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
import shuffle from "./../../firebase/firebaseAuthServices.js"

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
    var outing_details = doc.data();
    const price = outing_details.max_price === 0 ? 'Free' : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
    outings.push({
        listingID: doc.id,
        name: outing_details.name,
        details: outing_details.location,
        price: price,
        minimumPrice: outing_details.min_price,
        url: outing_details.images.length > 0 ? outing_details.images[0] : null,
        
    });
});

outings = shuffle(outings);

export default {
    name: 'explore',
    
    components: {
        NavBar, 
        OutingSGFooter
    },
    data: () => ({
        // retrieve the first 10 listings
        listings: outings,
        currentIndex: 0,
        sorting: true,
        searchField: new URLSearchParams(window.location.search).get('search'),
        sliderValue: 2,
        minPrice: 0,
        maxPrice: 50,
        minPax: 1,
        maxPax: 10,
        category: [],
        location: [],
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
        loadListings(){

            console.log("test")
            this.listings = [];
            this.category = [];
            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                this.pushListings(outing_details);
            });
            window.history.pushState({}, document.title, window.location.pathname); //remove the search query in the url

        },
        searchListings(){

            this.listings = []; // clear the existing array 
            
            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                
                var outing_name = outing_details.name.toLowerCase()
                var search_name = this.searchField.toLowerCase()
                
                if(outing_name.includes(search_name)){
                    this.pushListings(outing_details);               
                }
            });
            
        },
        filter(){
            this.listings = []; // clear the existing array

            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                var category;

                var checkCat = false;
                var checkPrice = false;
                var checkPax = false;
                var checkLocation = false;

                const selectedCategories = this.category;
                if (selectedCategories.length == 0){
                    checkCat = true;
                }else{
                    for (category of outing_details.category) {
                        var currCat = category.toLowerCase();
                        if (selectedCategories.includes(currCat)){
                            checkCat = true;
                            break;
                        }
                    }
                }

                // to be updated with the correct variable once finalised
                const selectedLocations = this.location;
                if (selectedLocations.length == 0){
                    checkLocation = true;
                }else{
                    for (location of outing_details.location) {
                        var currLocation = location.toLowerCase();
                        if (selectedLocations.includes(currLocation)){
                            checkLocation = true;
                            break;
                        }
                    }
                }

                if((outing_details.min_price >= this.minPrice) && (outing_details.max_price <= this.maxPrice)){
                    checkPrice = true;
                }

                if((this.minPax >= outing_details.min_recommended_pax) && (this.maxPax <= outing_details.max_recommended_pax)){
                    checkPax = true;
                }

                if (checkCat && checkPrice && checkPax){
                    this.pushListings(outing_details);
                }

            });
        },
        sortListings(){
            var selectedSort = this.selectedSort;
            var ascDesc = this.sorting; // true means asc, false means desc

            if(selectedSort == "price"){
                if(ascDesc == true){
                    this.listings.sort((a, b) => {
                    if (a.minimumPrice < b.minimumPrice) {
                        return -1;
                    }
                    if (a.minimumPrice > b.minimumPrice) {
                        return 1;
                    }
                    return 0;
                    });
                    
                }else{
                    this.listings.sort((a, b) => {
                    if (a.minimumPrice > b.minimumPrice) {
                        return -1;
                    }
                    if (a.minimumPrice < b.minimumPrice) {
                        return 1;
                    }
                    return 0;
                    });
                }
                

            }else if(selectedSort == "name"){
                if(ascDesc == true){
                    this.listings.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                    });
                    
                }else{
                    this.listings.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                    });
                }
            }
        },
        navigateToListing(listingID) {
            this.$router.push({ name: 'individualListing', params: { listingID } });
        },
        bookmarkListing(listing) {
            console.log('Bookmark clicked for:', listing);
            // Implement bookmark functionality here
        },
        pushListings(outing_details){
            let price = outing_details.max_price === 0 ? "Free" : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
            this.listings.push({
                listingID: doc.id,
                name: outing_details.name,
                details: outing_details.location,
                price: price,
                minimumPrice: outing_details.min_price,
                url: outing_details.images.length > 0 ? outing_details.images[0] : null
            });
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

.v-btn {
  position: absolute;
  top: -6px;
  right: 8px;
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
    background-color: var(--bg) !important; 
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

.btn{
    background-color: var(--secondary);
    border: solid var(--secondary);
    color: white !important;
}

.btn:hover {
    background-color: var(--transparent);
    border: solid var(--secondary);
    color: black !important;
}

.sort {
    background-color: white;
}

.userValues {
    width: 50px !important;
}

.ranges{
    accent-color: var(--secondary);
}

/* listing card css */
.v-btn {
    position: absolute;
    top: -6px;
    right: 8px;
}

.price {
    position: absolute;
    right: 0;
    bottom: 0;
    font-weight: normal;
}

.location {
    position: absolute;
    left: 0;
    bottom: 0;
    font-weight: normal;
}

.v-card:hover {
    opacity: 0.8; /* Optional: Add hover effect */
    cursor: pointer;
}

.hideScroll {
    scrollbar-width: none;
}

</style>