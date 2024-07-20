<template>
  <div class="v-carousel">
    <v-carousel
      show-arrows="hover"
      cycle
      :height="carousel_height"
      hide-delimiter-background>
      <template v-for="(slide, index) in slides" :key="index">
        <router-link v-if="isHomepage" :to="'/listing/' + slide.listingID" class="carousel-link">
          <v-carousel-item class="clickable">
            <img class="carousel-image" v-lazy="slide.url" :alt="'Slide ' + index" />
          </v-carousel-item>
        </router-link>
        <div v-else class="carousel-link">
          <v-carousel-item>
            <img class="carousel-image" v-lazy="slide.url" :alt="'Slide ' + index" />
          </v-carousel-item>
        </div>
      </template>
      <div class="carousel_title" v-if="isHomepage">
        <h3><b>Trending activities</b></h3>
      </div>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  props: {
    slides: Array,
    carousel_height: String
  },
  computed: {
    isHomepage() {
      return this.$route.path === '/';
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.v-carousel {
  position: relative;
  padding: 0px;
}

.carousel_title {
  position: absolute;
  text-align: center;
  top: 25px;
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  text-shadow: 
    -1px -1px 0 black,  
     1px -1px 0 black,
    -1px  1px 0 black,
     1px  1px 0 black; /* black outline */
}

.carousel-link {
  display: block;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire carousel item */
}

.clickable:hover {
  opacity: 0.8; /* Optional: Add hover effect */
  cursor: pointer;
}
</style>