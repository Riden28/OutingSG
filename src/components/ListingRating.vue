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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus eros sed rhoncus consequat. Fusce et malesuada libero. Pellentesque vel ornare urna. Cras sapien felis, molestie at bibendum sit amet, finibus quis ligula. Sed mattis urna nunc, et iaculis odio suscipit non. Nam cursus diam et arcu gravida suscipit. In non nibh eget neque dapibus posuere vitae quis eros. Fusce luctus vitae enim id maximus. Morbi iaculis lobortis mauris nec tincidunt. In vitae nulla non lectus lacinia finibus id ut velit. Nulla et dapibus mi. Donec sed magna in sem dignissim porttitor.

Sed sed nisl at elit tincidunt vulputate. Nam blandit enim ut turpis ultrices, vel blandit ligula pulvinar. Donec sodales lectus sit amet gravida sodales. Proin tincidunt magna id ullamcorper ultricies. Quisque in condimentum mauris. Donec ac elementum nunc. Donec molestie lorem felis, vitae cursus neque elementum a. Etiam id neque ut ex maximus pharetra. Morbi imperdiet augue vitae ex facilisis, at dapibus nisl laoreet. Sed dapibus libero dolor, id rhoncus felis rutrum vitae. Praesent tempus convallis sodales. Fusce urna diam, maximus sed aliquet vitae, gravida eget risus. Mauris dapibus leo at commodo tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer vitae odio nibh. Maecenas ultricies nulla non lacus rutrum, sit amet dictum ipsum hendrerit.

Nam sollicitudin faucibus tortor, ut vehicula felis egestas ut. Duis in eros vel nisl rutrum pellentesque vel eu nisi. Pellentesque et sagittis nunc. Vivamus ut vestibulum est. Nullam eleifend scelerisque ullamcorper. Donec blandit sit amet turpis vitae consectetur. Duis bibendum erat eu mauris tincidunt viverra. Nunc blandit nulla volutpat ipsum tincidunt, vitae pharetra est suscipit. Quisque erat nibh, vestibulum id porttitor et, volutpat non magna. Fusce pulvinar, est a condimentum vestibulum, turpis quam consectetur arcu, fringilla rutrum justo justo eget nunc. Etiam convallis ut risus eu bibendum. Duis bibendum placerat augue, et ultricies nunc convallis in. Vivamus semper vel turpis in gravida.

Donec suscipit luctus justo in placerat. Ut sodales est vel nisi maximus, nec pulvinar velit consequat. Nullam pharetra risus in odio sagittis malesuada. Nulla cursus efficitur mi ut volutpat. Suspendisse ut tellus pulvinar, mollis turpis vitae, ultricies mauris. Nunc neque odio, varius eu tempus feugiat, congue ac elit. Aliquam aliquet tristique massa. Morbi bibendum sollicitudin leo eget molestie. Cras nulla quam, euismod sed nulla interdum, placerat tempus nunc. Vestibulum ullamcorper eget urna nec aliquet. Sed.

 
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