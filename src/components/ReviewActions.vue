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
                <router-link to="/edit" class="btn btn-primary listingBtns" role="button" style='margin-right: 1px;'>
                    <img src='../assets/icons/gif/add.gif' style='width: 30px;'><span style='color:black;'> Add Review</span>
                </router-link>
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

    .listingBtns {
        background-color: white;
        margin-right: -20px;
        margin-left: 20px;
        border: solid var(--secondary);
    }
    
    .listingBtns:hover {
        background-color: white;
        border: solid black;
    }
</style>