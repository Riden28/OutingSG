<template>
          <div class="v-row information">
          <div class="info">
              <img src="../assets/icons/price-icon.png" class='image info' alt="">
              <p>Price</p>
              <p>$$</p>
          </div>
          <div class="info">
              <img src="../assets//icons/maps-icon.png" class='image info' alt="">
              <p>Location</p>
              <p>North</p>
          </div>
          <div class="info">
              <img src="../assets/icons/recommended-pax.png" class='image info' alt="">
              <p>Recommended Pax</p>
              <p>10+</p>
          </div>
          <div class="info">
              <img src="../assets//icons/rating-icon.png" class='image info' alt="">
              <p>Rating</p>
              <p>4.2 / 5 (92)</p>
          </div>
       </div>

       <div class="v-row description">
            <div class="v-col-7">
                <p> This is the listing's description, component: listingRating
 
                </p>
            </div>
            <div class="v-col-5">
                <img src="../assets/background/park.jpeg" alt="">
            </div>
        </div>

</template>
<script>
  export default {
    name: 'ListingRating'
    
  }
</script>

<style scoped>
        .btn-primary {
        background-color: #EAA843;
        color: black;
    }

    .information {
        background-color: #EAA843;
        display: flex;
        justify-content: space-evenly;
        margin-top: 2rem;
    }

    .info {
        width: 150px;
        align-self: start;
        justify-content: center;
        width: 130px;
        padding-top: 20px;
    }

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    
    img {
        width: 100%;
    }

    .v-col-7 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>