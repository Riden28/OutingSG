<template>
    <div>
        <!-- Section for showing reviews heading and add review button -->
        <div class="v-row reviews">
            <div class="filterbutton">
                <input class="btn btn-primary" type="button" value="Filter">
            </div>
            <div class="text-h5 pl-16" style="text-align:center;">
                <b>Reviews</b>
                <p style="font-size: 16px;">
                    Hear what visitors say about this outing!
                </p>
            </div>
            <div v-if="notReviewed" class="addreview">
                <button @click.prevent="toggleForm" class="btn btn-primary listingBtns" role="button" style="margin-right: 1px;">
                    <img src="../assets/icons/gif/add.gif" style="width: 30px;">
                    <span class='btn'> Add Review</span>
                </button>
            </div>
            <div v-else class="editreview">
                <button @click.prevent="toggleForm" class="btn btn-primary listingBtns" role="button" style="margin-right: 1px;">
                    <img src="../assets/icons/gif/edit.gif" style="width: 30px;">
                    <span class='btn'> Edit Review</span>
                </button>
            </div>
        </div>

        <!-- Form for adding review -->
        <form v-show="formVisible" @submit.prevent="submitReview" class="reviewform">
            <div class="cover v-container">
                <div class="title v-row">
                    <h3 v-if="notReviewed" >Add a Review</h3>
                    <h3 v-else>Edit Review</h3>
                </div>
                <div class="v-row rating">
                    <h4>Rating</h4>
                    <div class="stars">
                        <star-rating :star-size="20" v-model="rating"></star-rating>
                    </div>
                </div>
                <div class="v-row desc">
                    <h4>Review</h4>
                    <textarea id="review" v-model="review" class="description" placeholder="Review here..."></textarea>
                </div>
                <div class="submitReview">
                    <input type="submit" class="btn btn-primary submitReviewBtn" value="Submit">
                </div>
            </div>
            <button @click.prevent="toggleForm" class="closeform">&#10006;</button>
        </form>

        <!-- Notification -->
        <div v-if="notification.visible" :class="['notification', notification.type]">
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, setDoc , getDoc, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import firebaseConfig from './../../firebase/firebaseConfig.js';
import StarRating from 'vue-star-rating';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
    name: 'ReviewActions',
    components: {
        StarRating,
    },
    props: {
        outingID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            formVisible: false,
            rating: 5,
            review: '',
            notReviewed: true,
            notification: {
                visible: false,
                message: '',
                type: ''
            }
        };
    },
    async mounted(){
        // check if user is logged in, if user is logged in, check if user has already reviewed this outing, if yes, show edit review button
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.reviews.includes(this.outingID)) {
                    this.notReviewed = false;
                    //retrieve review details
                    const reviewRef = doc(collection(doc(db, "outings", this.outingID), "reviews"), userId);
                    const reviewDoc = await getDoc(reviewRef);
                    if (reviewDoc.exists()) {
                        const reviewData = reviewDoc.data();
                        this.rating = reviewData.rating;
                        this.review = reviewData.review;
                    }
                }
            }
        }
    },
    methods: {
        toggleForm() {
            this.formVisible = !this.formVisible;
        },
        showNotification(message, type) {
            this.notification.message = message;
            this.notification.type = type;
            this.notification.visible = true;
            setTimeout(() => {
                this.notification.visible = false;
                if (type === 'success') {
                    window.location.reload();
                }
            }, 2000);
        },
        async submitReview() {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error("User not authenticated");
                    this.showNotification('Please log in to submit a review', 'error');
                    return;
                }
                const userId = user.uid;

                const reviewData = {
                    rating: this.rating,
                    review: this.review,
                    date: new Date()
                };

                const reviewRef = doc(collection(doc(db, "outings", this.outingID), "reviews"), userId);
                await setDoc(reviewRef, reviewData);
                console.log("Review added successfully");

                // Add to user database that this review is created by them (append to reviews array)
                const userRef = doc(db, "users", userId);
                await updateDoc(userRef, {
                    reviews: arrayUnion(this.outingID),
                });

                // Notify the user and reset form
                this.showNotification('Review added successfully', 'success');
                this.toggleForm();
                this.rating = 5;
                this.review = '';
            } catch (error) {
                console.error("Error adding review: ", error);
                this.showNotification('Error adding review', 'error');
            }
        }
    }
};
</script>

<style scoped>
.reviewform {
    z-index: 1000;
    background: white;
    height: 70vh;
    width: 80vw;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-left: 100px;
    padding-top: 20px;
}
.reviews {
    display: flex;
    justify-content: space-around;
    margin-top: 100px !important;
    margin-bottom: 30px;
}
p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
}
.btn-primary {
    background-color: #EAA843;
    color: black;
}
.title {
    display: flex;
    justify-content: center;
}
.addreviewbutton {
    background-color: white;
    border: 1px solid black;
}
h3, h4 {
    font-weight: bolder;
}
.stars {
    margin-left: 6vh;
}
.description {
    background-color: lightgray !important;
    margin-left: 5vh;
    height: 40vh;
    width: 60vw;
}
.closeform {
    display: flex;
    align-items: start;
    height: 45px;
    margin-right: 10px;
    border: solid white;
}

.closeform:hover {
    border: solid black;
}

.submitReview {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}
button, .btn {
    background-color: white !important;
}
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    color: white;
}
.notification.success {
    background-color: green;
}
.notification.error {
    background-color: red;
}

.listingBtns {
    background-color: white !important;
    margin-right: -20px;
    margin-left: 20px;
    border: solid var(--secondary);
}
.listingBtns:hover {
    background-color: white !important;
    border: solid black;
}

.submitReviewBtn {
    background-color: var(--secondary) !important;
    border: solid var(--secondary);
    color:white;
    padding: 10px 20px;
}
.submitReviewBtn:hover {
    background-color: white !important;
    border: solid var(--secondary);
    color:black;
}

#review {
    background: #f6f6f6 !important;
    padding: 20px;
}
</style>