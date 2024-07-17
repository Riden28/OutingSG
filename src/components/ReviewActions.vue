<template>
    <div class="v-row reviews">
            <div class="filterbutton">
                <input class="btn btn-primary" type="button" value="Filter">
            </div>
            <div class="text-h5 pl-16" style='text-align:center;'>
            <b>Reviews</b>
                <p style='font-size: 16px;'>
                    Hear what visitors say about this outing!                
                </p>
            </div>
            <div class="addreview">
                <button @click="toggleForm" class="btn btn-primary listingBtns" role="button" style='margin-right: 1px;'>
                    <img src='../assets/icons/gif/add.gif' style='width: 30px;'><span style='color:black;'> Add Review</span>
                </button>
            </div>
        </div>
        <!-- form for adding review -->
        <form v-show="formVisible" class = "reviewform">
            <div class="cover v-container">
                <div class="title v-row">
                    <h3>Add a Review</h3>
                </div>
                <div class="v-row rating">
                    <h4>Rating</h4>
                    <div class="stars">
                        <star-rating :star-size="20" v-model:rating="rating"/>
                    </div>
                </div>
                <div class="v-row desc">
                    <h4>Review</h4>
                    <input type="text" class="description" placeholder="Review here...">
                </div>
                <div class="submitReview">
                    <input type="submit" class="btn btn-primary" value="submit">
                </div>
                
            </div>
            <button @click="toggleForm" class="closeform">&#10006;</button>
        </form>

</template>

<script>
import StarRating from 'vue-star-rating'
    export default {
        name: 'ReviewActions',
        components: {
            StarRating,
        },
        data () {
            return {
                formVisible: false,
                rating: 0,
            }
        },
        methods: {
            toggleForm () {
                this.formVisible = !this.formVisible;
            }
        }
    }
    
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
        align-items:start;
        height: 8vh;
    }
    .submitReview {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
    button, .btn {
        background-color: #EAA843 !important;
    }
</style>