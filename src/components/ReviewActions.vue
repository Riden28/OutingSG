<template>
    <div class="v-row reviews">
            <div class="filterbutton">
                <input class="btn btn-primary" type="button" value="Filter">
            </div>
            <div class="reviewdesc">
                <p style="font-weight: bolder;">Reviews</p>
                <p>Hear what visitors say about this outing!</p>
            </div>
            <div class="addreview">
                <router-link to="/edit" class="btn btn-primary" role="button">Add Review</router-link>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'ReviewActions'
    }
</script>

<style scoped>
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
</style>