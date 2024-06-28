<template>
   <div class="v-carousel">
    <v-carousel
    show-arrows="hover" 
    cycle
    height="373"
    hide-delimiter-background>
        <v-carousel-item
        v-for="(slide, index) in slides"
            :src="slide.url"
            :key="index"
            cover
        ></v-carousel-item>
    </v-carousel>
    </div>

</template>

<script>
    export default {
        name: 'ImageCarousel',

      data () {
        return {
          slides: [
            {name: "first", url: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"},
            {name: "2nd", url: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg"},
            {name: "3rd", url: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"}
          ],
        }
      },
    }
</script>

<style scoped>
    .v-carousel {
        width: auto;
        padding: 0px 0px 0px 0px;
        justify-content: center;
        align-items: center;
    }
</style>