<template>
  <div class="v-carousel">
    <v-carousel
    show-arrows="hover" 
    cycle
    height="373"
    hide-delimiter-background>
      <router-link
        v-for="(slide, index) in slides"
        :key="index"
        :to="'/listing/' + slide.listingID"
        class="carousel-link"
      >
        <v-carousel-item
          :src="slide.url"
          cover
          width="100%"
        ></v-carousel-item>
      </router-link>
      <div class="carousel_title" v-if="isHomepage">Trending Activities</div>
    </v-carousel>
  </div>

</template>

<script>
    export default {
        name: 'ImageCarousel',
        props: {
            slides: Array
        },
        computed: {
            isHomepage() {
                return this.$route.path === '/';
            }
        },

      data () {
        return {
        }
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
  .v-carousel-item:hover {
    opacity: 0.8; /* Optional: Add hover effect */
    cursor: pointer;
  }
</style>