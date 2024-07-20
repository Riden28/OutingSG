<template>
  <NavBar />
  <!-- <ImageCarousel/> -->

  <!-- <div class="CategoryBar">
    <CategorySelector/>
  </div> -->
  <div class="ListingDisplay">
    <createdListingsDisplay/>
  </div>
  <OutingSGFooter/>

</template>

<script>
  // import CategorySelector from '@/components/CategorySelector.vue';
  // import ImageCarousel from '@/components/ImageCarousel.vue';
  import ListingsDisplay from '@/components/ListingsRecommend.vue'; // Changing this to get the created listings of a certain user
  import NavBar from '@/components/NavBar.vue';
  import OutingSGFooter from '@/components/Footer.vue';
  import CreatedListingsDisplay from '@/components/CreatedListingsDisplay.vue';
  

  export default {
    name: 'created',
    
    components: {
      NavBar,
      CreatedListingsDisplay,
      OutingSGFooter
    },
    mounted(){
      window.scrollTo(0, 0);
    }
  };
</script>

<style>


</style>

