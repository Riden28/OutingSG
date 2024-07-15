<template>
    <div class="reviews">
        <!-- this is for name & rating, but will change from hard code to link to database in later stages -->
        <div class="v-row labels">
            <div class="v-col-4">
                <h4>JOHN POPPERS</h4>
                <div class="stars">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
            </div>

            <!-- date at end of page -->
            <div class="v-col-8">
                <div class="date">
                    <p>21 May 2024</p>
                </div>
            </div>
        </div>
        

        <!-- content of review, will link to database -->
        <div class="description">
            <p> This place is good! Component: review.vue
</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Review'
    }
</script>

<style scoped>
    .reviews {
        background-color: grey;
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
        padding: 30px;
    }

    .date {
        padding-right: 30px;
    }
</style>