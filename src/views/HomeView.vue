<template>
  <NavBar />
  <ImageCarousel/>

  <div class="CategoryBar">
    <CategorySelector/>
  </div>
  <div class="ListingDisplay">
    <ListingsDisplay/>
  </div>
  <NavBar/>
  <OutingSGFooter/>

</template>

<script>
  import CategorySelector from '@/components/CategorySelector.vue';
  import ImageCarousel from '@/components/ImageCarousel.vue';
  import ListingsDisplay from '@/components/ListingsDisplay.vue';
  import NavBar from '@/components/NavBar.vue';

  export default {
    name: 'home',
    
    components: {
      NavBar,
      ImageCarousel,
      CategorySelector,
      ListingsDisplay,
      
      
      NavBar, 
      OutingSGFooter
    },
  };
</script>

<style>


</style>
