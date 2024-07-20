<template>
    <NavBar />

    <div class="wrapper">
        <div class="sidebar">
            <h3 class="title">Filters</h3>
            <button class='btn' @click.prevent="loadListings()">Reset Filters</button>
            <hr>

            <h4 class="title">Category</h4>
            <input type="checkbox" v-model="category" value='Food and Beverages' id="Food and Beverages">
            <label for="Food and Beverages">Food and Beverages</label><br>
            <input type="checkbox" v-model="category" value='Nature' id="Nature">
            <label for="Nature">Nature</label><br>
            <input type="checkbox" v-model="category" value='Culture and History' id="Culture and History">
            <label for="Culture and History">Culture and History</label><br>
            <input type="checkbox" v-model="category" value='Entertainment' id="Entertainment">
            <label for="Entertainment">Entertainment</label><br>
            <input type="checkbox" v-model="category" value='Outdoor Activities' id="Outdoor Activities">
            <label for="Outdoor Activities">Outdoor Activities</label><br>
            <input type="checkbox" v-model="category" value='Educational' id="Educational">
            <label for="Educational">Educational</label><br>
            <input type="checkbox" v-model="category" value='Adventure' id="Adventure">
            <label for="Adventure">Adventure</label><br>
            <input type="checkbox" v-model="category" value='Shopping' id="Shopping">
            <label for="Shopping">Shopping</label><br>
            <input type="checkbox" v-model="category" value='Wellness' id="Wellness">
            <label for="Wellness">Wellness</label><br>
            <input type="checkbox" v-model="category" value='Events and Festivals' id="Events and Festivals">
            <label for="Events and Festivals">Events and Festivals</label><br>

            <h4 class="title">Price</h4>
            <p>Minimum Price: <input type='number' v-model='minPrice' class='userValues' min="0"></p>
            <input type="range" v-model="minPrice" min="0" class='ranges' />
            <p>Maximum Price: <input type='number' v-model='maxPrice' class='userValues' min="0" max="1000"></p>
            <input type="range" v-model="maxPrice" min="0" class='ranges' />

            <!-- <input type="checkbox" id="price1"><label for="price1">$</label><br>
            <input type="checkbox" id="price2"><label for="price2">$$</label><br>
            <input type="checkbox" id="price3"><label for="price3">$$$</label><br> -->

            <h4 class="title">Location</h4>
            <input type="checkbox" v-model="filterRegion" id="North" value="North"><label for="North">North</label><br>
            <input type="checkbox" v-model="filterRegion" id="South" value="South"><label for="South">South</label><br>
            <input type="checkbox" v-model="filterRegion" id="East" value="East"><label for="East">East</label><br>
            <input type="checkbox" v-model="filterRegion" id="West" value="West"><label for="West">West</label><br>
            <input type="checkbox" v-model="filterRegion" id="Central" value="Central"><label for="Central">Central</label><br>


            <h4 class="title">Recommended Pax</h4>
            <p>Minimum Pax: <input type='number' v-model='minPax' class='userValues' min="1"></p>
            <input type="range" v-model="minPax" min="1" max="20" class='ranges' />
            <p>Maximum Pax: <input type='number' v-model='maxPax' class='userValues' min="1"></p>
            <input type="range" v-model="maxPax" min="1" max="20" class='ranges' />


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
                    <v-col v-for="listing in listings" :key="listing.listingID" cols="auto">
                        <v-card class="mx-1" height="280" width="417" rounded="xl" @click="navigateToListing(listing.listingID)">
                            <v-img :src="listing.url" height="174px" cover
                               ></v-img>
                            <v-btn 
                                flat
                                border="0"
                                icon="mdi-bookmark"
                                base-color="transparent"
                                @click.stop.prevent="bookmarkListing(listing)"
                            >
                                <v-icon
                                    :icon="listing.bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'" size="50"
                                    color="var(--primary)"></v-icon>
                            </v-btn>
                            <v-card-title><b>{{ listing.name }}</b></v-card-title>
                            <v-card-text class="location">{{ listing.details }}</v-card-text>
                            <v-card-title class="price">{{ listing.price }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>


    <OutingSGFooter />
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import OutingSGFooter from '@/components/Footer.vue';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, query, where, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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

const user = auth.currentUser;

const userID = user ? user.uid : null;

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
        filterRegion: [],
        selectedSort: "",
        userID: auth.currentUser ? auth.currentUser.uid : null
    }),
    methods: {
        // on every load retrieve another 10 listings
        load({ done }) {
            setTimeout(() => {
                this.currentIndex += 10
                this.listings.push(
                    outings.slice(this.currentIndex, this.listings.length + 10)
                )
                done('ok')
            }, 1000)
        },
        loadListings() {

            this.listings = [];
            this.category = [];
            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();
                this.pushListings(outing_details, doc.id);
            });
            window.history.pushState({}, document.title, window.location.pathname); //remove the search query in the url

        },
        searchListings() {

            this.listings = []; // clear the existing array 

            querySnapshot.forEach((doc) => {
                var outing_details = doc.data();

                var outing_name = outing_details.name.toLowerCase()
                var search_name = this.searchField.toLowerCase()

                if (outing_name.includes(search_name)) {
                    this.pushListings(outing_details, doc.id);
                }
            });

        },
        filter() {
            var checkPriceRange = true;
            var checkPaxRange = true;
            var alertMsg = "";

            if (this.minPrice > this.maxPrice){
                checkPriceRange = false;
                alertMsg += "Minimum Price has to be smaller than Maximum Price. ";
            }
            if (this.minPax > this.maxPax){
                checkPaxRange = false;
                alertMsg += "Minimum Pax has to be smaller than Maximum Pax.";
            }

            if(checkPaxRange && checkPriceRange){
                this.listings = []; // clear the existing array

                querySnapshot.forEach((doc) => {
                    var outing_details = doc.data();
                    var category;

                    var checkCat = false;
                    var checkPrice = false;
                    var checkPax = false;
                    var checkRegion = false;

                    const selectedCategories = this.category;
                    
                    if (selectedCategories[0] == undefined && selectedCategories.length == 1) {
                        checkCat = true;
                    } else {
                        for (category of outing_details.category) {
                            
                            if (selectedCategories.includes(category)) {
                                checkCat = true;
                                // console.log('break');
                                break;
                            }
                            // console.log('no break');
                        }
                    }

                    const selectedRegions = this.filterRegion;
                    if (selectedRegions.length == 0) {
                        checkRegion = true;
                    } else {
                        if (selectedRegions.includes(outing_details.Region)) {
                            checkRegion = true;
                        }
                    }

                    if ((outing_details.min_price >= this.minPrice) && (outing_details.max_price <= this.maxPrice)) {
                        checkPrice = true;
                    }

                    if ((this.minPax >= outing_details.min_recommended_pax) && (this.maxPax <= outing_details.max_recommended_pax)) {
                        checkPax = true;
                    }

                    if (checkCat && checkPrice && checkPax && checkRegion) {
                        this.pushListings(outing_details, doc.id);
                    }

                });
            }else{
                alert(alertMsg);
            }
            
        },
        sortListings() {
            var selectedSort = this.selectedSort;
            var ascDesc = this.sorting; // true means asc, false means desc

            if (selectedSort == "price") {
                if (ascDesc == true) {
                    this.listings.sort((a, b) => {
                        if (a.minimumPrice < b.minimumPrice) {
                            return -1;
                        }
                        if (a.minimumPrice > b.minimumPrice) {
                            return 1;
                        }
                        return 0;
                    });

                } else {
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


            } else if (selectedSort == "name") {
                if (ascDesc == true) {
                    this.listings.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });

                } else {
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
        async navigateToListing(listingID) {
            if (this.userID) {
                const userDocRef = doc(db, "users", this.userID);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    let listingsHistory = userDocSnap.data().listingsHistory || [];
                    listingsHistory = listingsHistory.filter(id => id !== listingID);
                    if (listingsHistory.length >= 10) {
                        listingsHistory.shift();
                    }
                    listingsHistory.push(listingID);
                    await updateDoc(userDocRef, { listingsHistory });
                }
            }
            this.$router.push({ name: 'individualListing', params: { listingID } });
        },
        pushListings(outing_details, docID) {
            let price = outing_details.max_price === 0 ? "Free" : `$${outing_details.min_price} ~ $${outing_details.max_price}`;
            this.listings.push({
                listingID: docID,
                name: outing_details.name,
                details: outing_details.location,
                price: price,
                minimumPrice: outing_details.min_price,
                url: outing_details.images.length > 0 ? outing_details.images[0] : null
            });
        },
        fetchCategoryFilter() { // for navigation from homepage category buttons

            if (this.$route.query.category != undefined){
                this.category = [this.$route.query.category];
                this.filter();
            }
            
        },
        async checkBookmarkedListings() {
            const user = auth.currentUser;
            if (!user) return;

            const userDocRef = doc(db, "users", this.userID); // Use this.userID
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const savedOutings = userData.savedOutings || [];
                this.listings.forEach(outing => {
                    if (savedOutings.includes(outing.listingID)) {
                        outing.bookmarked = true;
                    } else {
                        outing.bookmarked = false; // Ensure non-bookmarked listings are correctly marked as such
                    }
                });
            }
        },
        async bookmarkListing(listing) {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);

                try {
                    if (listing.bookmarked) {
                        // Remove from bookmarks
                        await updateDoc(userDocRef, {
                            savedOutings: arrayRemove(listing.listingID)
                        });
                    } else {
                        // Add to bookmarks
                        await updateDoc(userDocRef, {
                            savedOutings: arrayUnion(listing.listingID)
                        });
                    }

                    // Toggle bookmarked status locally
                    listing.bookmarked = !listing.bookmarked;
                } catch (error) {
                    console.error('Error updating document:', error);
                }
            } else {
                alert('Please login to save outings');
            }
        },
    },
    created() {
        this.checkBookmarkedListings();
        // Debug
        const user = auth.currentUser;
        if (user) {
            console.log(user.displayName);
        } else {
            console.log("Not logged in");
        }
        // End debug
        const navSearch = new URLSearchParams(window.location.search).get('search');

        if (navSearch !== null) {
            this.searchListings();
        }


    },
    mounted() {
        this.category.push(this.$route.params.categoryName);
        this.fetchCategoryFilter();
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

.location {
    position: absolute;
    left: 0px;
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
    right: 8px;
}

.price {
    position: absolute;
    right: 0px;
    bottom: 0px;
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

.sort {
    background-color: white;
}

.userValues {
    width: 100px !important;
}

.ranges {
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

.v-card:hover {
    opacity: 0.8;
    /* Optional: Add hover effect */
    cursor: pointer;
}

.hideScroll {
    scrollbar-width: none;
}

</style>