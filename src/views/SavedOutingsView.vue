<template>
    <NavBar />
    <!-- <ImageCarousel/> -->
  
    <!-- <div class="CategoryBar">
      <CategorySelector/>
    </div> -->
    <div class="ListingDisplay">
      <SavedListingsDisplay/>
    </div>
    <OutingSGFooter/>
  
  </template>
  
  <script>
    // import CategorySelector from '@/components/CategorySelector.vue';
    // import ImageCarousel from '@/components/ImageCarousel.vue';
    import ListingsDisplay from '@/components/ListingsRecommend.vue'; // Changing this to get the saved listings of a certain user
    import NavBar from '@/components/NavBar.vue';
    import OutingSGFooter from '@/components/Footer.vue';
    import SavedListingsDisplay from '@/components/SavedListingsDisplay.vue';
    
  
    export default {
      name: 'saved',
      
      components: {
        NavBar,
        SavedListingsDisplay,
        OutingSGFooter
      },
    };
  </script>
  
  <style>
  
  
  </style>
  
