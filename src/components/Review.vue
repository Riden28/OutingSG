<template>
    <div class="reviews">
        <div v-for="review in displayedReviews" :key="review.id" class="review">
            <div class="v-row labels">
                <div class="v-col-4">
                    <h4>{{ review.displayName.toUpperCase() }}</h4>
                    <div class="stars">
                        <span v-for="n in 5" :key="n" class="fa fa-star" :class="{ 'checked': n <= review.rating }"></span>
                    </div>
                </div>
                <div class="v-col-8">
                    <div class="date">
                        <p>{{ new Date(review.date.seconds * 1000).toLocaleDateString() }}</p>
                    </div>  
                </div>
            </div>
            <div class="description">
                <p>{{ review.review }}</p>
            </div>
            <hr>
        </div>
        <div v-if="displayedReviews.length === 0" class="no-reviews">
            <p>No reviews yet!</p>
        </div>
        <div v-else-if="hasMoreReviews" class="load-more">
            <button @click="loadMoreReviews">Load More Reviews</button>
        </div>
        <div v-else class="no-more-reviews">
            <p>No more reviews!</p>
        </div>
    </div>
</template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
    name: 'Review',
    props: {
        outingID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            reviews: [],
            displayedReviews: [],
            reviewsPerPage: 3,
            currentPage: 0,
            hasMoreReviews: true
        }
    },
    async mounted(){
        await this.fetchReviews();
        this.loadMoreReviews();
    },
    methods: {
        async fetchReviews() {
            const reviewsRef = collection(db, "outings/" + this.outingID + "/reviews");
            const reviewsSnap = await getDocs(reviewsRef);
            const tempReviews = [];

            for (const reviewDoc of reviewsSnap.docs) {
                let reviewDetails = reviewDoc.data();
                const reviewerId = reviewDoc.id;

                try {
                    const displayName = await this.findDisplayName(reviewerId);
                    tempReviews.push({
                        id: reviewDoc.id,
                        displayName: displayName,
                        rating: reviewDetails.rating,
                        review: reviewDetails.review,
                        date: reviewDetails.date
                    });
                } catch (error) {
                    console.error("Error fetching display name: ", error);
                }
            }

            this.reviews = tempReviews;
        },
        async findDisplayName(reviewerId) {
            const userRef = doc(db, "users", reviewerId);
            const userSnap = await getDoc(userRef);
            return userSnap.data().displayName;
        },
        loadMoreReviews() {
            const start = this.currentPage * this.reviewsPerPage;
            const end = start + this.reviewsPerPage;
            this.displayedReviews.push(...this.reviews.slice(start, end));
            this.currentPage++;
            if (this.displayedReviews.length >= this.reviews.length) {
                this.hasMoreReviews = false;
            }
        }
    }
}
</script>

<style scoped>
.reviews {
    background-color: white;
    margin-bottom: 20px;
}
.checked {
    color: orange;
}
.labels {
    display: flex;
    justify-content: space-around;
}
.v-col-8 {
    display: flex;
    justify-content: end;
}
.v-col-4 {
    display: flex;
    justify-content: space-around;
}
.stars {
    margin-right: 50px;
    padding-top: 7px;
}
.description {
    padding: 10px 30px 10px 30px;
}
.date {
    padding-right: 30px;
    font-size: 13px;
    color: rgb(166, 166, 166);
}
h4 {
    font-weight: 700;
    /* margin-left: -40px; */
}
.no-reviews{
    text-align: center;
    margin: 20px 0;
    background: var(--bg);
}
.load-more {
    text-align: center;
    margin: 20px 0;
}
.no-more-reviews {
    text-align: center;
    margin: 20px 0;
    color: rgb(166, 166, 166);
    padding: 10px;
}

</style>