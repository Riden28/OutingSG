<template>
    <NavBar/>

    <div class="wrapper"> 
        <div class="sidebar"> 
            <h3 class="title">Filters</h3>
            <button class='btn' @click.prevent="loadListings()">Reset Filters</button>
            <hr>

            <h4 class="title">Category</h4> 
            <input type="checkbox" v-model="category" value='fnb' id="fnb"><label for="fnb">F&B</label><br>
            <input type="checkbox" v-model="category" value='nature' id="nature"><label for="nature">Nature</label><br>
            <input type="checkbox" v-model="category" value='cultural' id="cultural"><label for="cultural">Cultural</label><br>
            <input type="checkbox" v-model="category" value='entertainment' id="entertainment"><label for="entertainment">Entertainment</label><br>
            <input type="checkbox" v-model="category" value='outdoor' id="outdoor"><label for="outdoor">Outdoor</label><br>
            <input type="checkbox" v-model="category" value='educational' id="educational"><label for="educational">Educational</label><br>
            <input type="checkbox" v-model="category" value='adventure' id="adventure"><label for="adventure">Adventure</label><br>
            <input type="checkbox" v-model="category" value='shopping' id="shopping"><label for="shopping">Shopping</label><br>
            <input type="checkbox" v-model="category" value='wellness' id="wellness"><label for="wellness">Wellness</label><br>
            <input type="checkbox" v-model="category" value='events' id="events"><label for="events">Events</label><br>

            <h4 class="title">Price</h4> 
            <p>Minimum Price: <input type='number' v-model='minPrice' class='userValues' min="0"></p>
            <input type="range" v-model="minPrice" min="0" class='ranges'/>
            <p>Maximum Price: <input type='number' v-model='maxPrice' class='userValues' min="0"></p>
            <input type="range" v-model="maxPrice" min="0" class='ranges'/>

            <!-- <input type="checkbox" id="price1"><label for="price1">$</label><br>
            <input type="checkbox" id="price2"><label for="price2">$$</label><br>
            <input type="checkbox" id="price3"><label for="price3">$$$</label><br> -->

            <h4 class="title">Location</h4> 
            <input type="checkbox" id="north"><label for="north">North</label><br>
            <input type="checkbox" id="south"><label for="south">South</label><br>
            <input type="checkbox" id="east"><label for="east">East</label><br>
            <input type="checkbox" id="west"><label for="west">West</label><br>
            <input type="checkbox" id="central"><label for="central">Central</label><br>

            
            <h4 class="title">Recommended Pax</h4> 
            <p>Minimum Pax: <input type='number' v-model='minPax' class='userValues' min="1"></p>
            <input type="range" v-model="minPax" min="1" class='ranges'/>
            <p>Maximum Pax: <input type='number' v-model='maxPax' class='userValues' min="1"></p>
            <input type="range" v-model="maxPax" min="1" class='ranges'/>
            

            <br><button class='btn' @click.prevent='filter()'>Filter</button><br><br>

            <h3 class="title">Sort</h3>
            <select name="sort" id="sort" class='sort' v-model="selectedSort">
                <option value="category" selected>Category</option>
                <option value="price">Price</option>
            </select>
            <img src="../assets/icons/up.png" v-on:click="sorting = false" v-if="sorting" class="sortIcon">
            <img src="../assets/icons/down.png" v-on:click="sorting = true" v-else class="sortIcon">
            <br><br><button class='btn' @click.prevent="sortListings()">Sort</button>
 

        </div> 
  
        <div class="main">

            <h2 class="title">Outings</h2>

            <v-container fluid class="mx-auto overflow-auto">
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
        listings: outings.slice(0,10),
        currentIndex: 0,
        sorting: true,
        searchField: new URLSearchParams(window.location.search).get('search'),
        sliderValue: 2,
        minPrice: 0,
        maxPrice: 25,
        minPax: 1,
        maxPax: 2,
        category: [],
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
            
                let price;
                if (outing_details.max_price === 0) {
                    price = "Free";
                } else {
                    price = "$" + outing_details.min_price + ' ~ $' + outing_details.max_price;
                }
                
                this.listings.push({
                    listingID: doc.id,
                    name: outing_details.name,
                    details: outing_details.location,
                    price: price,
                    url: outing_details.images.length > 0 ? outing_details.images[0] : null
                }); 
            });
            window.history.pushState({}, document.title, window.location.pathname); //remove the search query in the url

        },
        searchListings(){

            this.listings = []; // clear the existing array 
            
            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                
                var outing_name = outing_details.name.toLowerCase()
                var search_name = this.searchField.toLowerCase()

                let price;
                if (outing_details.max_price === 0) {
                    price = "Free";
                } else {
                    price = "$" + outing_details.min_price + ' ~ $' + outing_details.max_price;
                }
                
                if(outing_name.includes(search_name)){
                    this.listings.push({
                        listingID: doc.id,
                        name: outing_details.name,
                        details: outing_details.location,
                        price: price,
                        url: outing_details.images.length > 0 ? outing_details.images[0] : null
                    });                
                }
            });
            
        },
        filter(){
            this.listings = []; // clear the existing array

            const selectedCategories = this.category;
            console.log(selectedCategories);
            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                var category;

                var checkCat = false;
                var checkPrice = false;
                var checkPax = false;

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

                if((outing_details.min_price >= this.minPrice) && (outing_details.max_price <= this.maxPrice)){
                    checkPrice = true;
                }

                if((this.minPax >= outing_details.min_recommended_pax) && (this.maxPax <= outing_details.max_recommended_pax)){
                    checkPax = true;
                }

                if (checkCat && checkPrice && checkPax){
                    let price = outing_details.max_price === 0 ? "Free" : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
                    this.listings.push({
                        listingID: doc.id,
                        name: outing_details.name,
                        details: outing_details.location,
                        price: price,
                        url: outing_details.images.length > 0 ? outing_details.images[0] : null
                    });
                }

            });
        },
        sortListings(){
            var selectedSort = this.selectedSort;
            var ascDesc = this.sorting; // true means asc, false means desc

            if(selectedSort == "price"){
                if(ascDesc == true){

                }else{

                }
            }else if(selectedSort == "price"){

            }
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
</style>