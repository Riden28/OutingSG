<template> 
    <NavBar /> 
<<<<<<< HEAD
    <div class="cover">
    <form action="">
      <div class="top"></div>
      <div class="bottom v-row">
        <div class="v-col-5">
          <!-- here goes the google maps selector -->
        </div>

        <div class="v-col-7">
          <div class="row1">
            <div class="category">
              <h4>Category</h4>
              <input type="checkbox" v-model="toggle" true-value="food'" false-value="no"/> F&B
              <br>
              <input type="checkbox" v-model="toggle" true-value="nature" false-value="null"/> Nature
              <br>
              <input type="checkbox" v-model="toggle" true-value="cultural" false-value="null"/> Cultural
              <br>
              <input type="checkbox" v-model="toggle" true-value="entertainment" false-value="null"/> Entertainment
              <br>
              <input type="checkbox" v-model="toggle" true-value="outdoor" false-value="null"/> Outdoor
              <br>
              <input type="checkbox" v-model="toggle" true-value="educational" false-value="null"/> Educational
              <br>
              <input type="checkbox" v-model="toggle" true-value="adventure" false-value="null"/> Adventure
              <br>
              <input type="checkbox" v-model="toggle" true-value="shopping" false-value="null"/> Shopping
              <br>
              <input type="checkbox" v-model="toggle" true-value="wellness" false-value="null"/> Wellness
              <br>
              <input type="checkbox" v-model="toggle" true-value="events" false-value="null"/> Events
              <br>
            </div>
            <div class="price">
              <h4>Price: {{ picked }}</h4>
              <input type="radio" id="one" value="One" v-model="picked" />
              <label for="one">One</label>

              <input type="radio" id="two" value="Two" v-model="picked" />
              <label for="two">Two</label>

              <input type="radio" id="three" value="Three" v-model="picked" />
              <label for="three">Three</label>
            </div>
            <div class="recommended-pax">
              <h4>Recommended Pax</h4>
              <input type="range" v-model="sliderValue" min="1" max="20" />
              <p>Number: {{ sliderValue }}</p>
            </div>
          </div>
          <div class="row2">
            <div class="area">
              <h4>Location</h4>
              <input type="checkbox" v-model="toggle" true-value="north" false-value="no"/> North
              <br>
              <input type="checkbox" v-model="toggle" true-value="south" false-value="null"/> South
              <br>
              <input type="checkbox" v-model="toggle" true-value="east" false-value="null"/> East
              <br>
              <input type="checkbox" v-model="toggle" true-value="west" false-value="null"/> West
            </div>
            <div class="location">
              <h4>Exact Location: </h4>
              <input v-model="message" value = [] placeholder="location" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
=======
    <form action="">
      <div class="upper">

      </div>
      <div class="lower">
        <div class="left">

        </div>
        <div class="right">
          <div class="row1">
            <div class="category">
              <select name="category" id="">
                <option value="F&B">F</option>
                <option value="nature">nature</option>
              </select>
            </div>
            <div class="price"></div>
            <div class="recommended-pax"></div>
          </div>
          <div class="row2">
            <div class="area"></div>
            <div class="location"></div>
          </div>
        </div>
    </div>
    </form>


>>>>>>> 23c9ff4eecef99fabb907d4c3a1dedf4f744a25e
    <OutingSGFooter/>
</template> 
 
<script> 
  import NavBar from '@/components/NavBar.vue'; 
  import OutingSGFooter from '@/components/Footer.vue';
  // import VueSlideBar from 'vue-slide-bar';
 
  export default { 
    name: 'create', 
    components: { 
      NavBar,
      OutingSGFooter,
      // VueSlideBar
      
    }, 
    data() {
      return {
        picked: '',
        sliderValue: 20
      }
    }
  }; 
</script>

<style scoped>
<<<<<<< HEAD
  .cover {
    background-color: white;
  }
  input, .category {
    color: black;
  }
  .v-row {
    width: 100%;
  }
  .v-col-7 {
    color:black;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .row2 {
    display: flex;
    justify-content: start;
  }
  label {
    margin-right: 10px;
  }
  .location {
    margin-left: 3rem;
  }
=======

>>>>>>> 23c9ff4eecef99fabb907d4c3a1dedf4f744a25e
</style>
