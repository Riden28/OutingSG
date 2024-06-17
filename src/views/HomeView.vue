<template>
  <NavBar />
  <ImageCarousel/>

  <div class="CategoryBar">
    <CategorySelector/>
  </div>
</template>

<script>
  import CategorySelector from '@/components/CategorySelector.vue';
  import ImageCarousel from '@/components/ImageCarousel.vue';
  import NavBar from '@/components/NavBar.vue';
  

  export default {
    name: 'home',
    
    components: {
      NavBar,
      ImageCarousel,
      CategorySelector
      
      
    },
  };
</script>