<template>
  <div>
    <NavBar />
  </div>
  
  <div class="content">

  
  </div>
  
  <OutingSGFooter />
</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  import OutingSGFooter from '@/components/Footer.vue';

  export default {
    
    name: 'aboutUs',
    
    components: {
      NavBar,
      OutingSGFooter
    },
  };

</script>

<style>
  
  .content {
    background-color: rgb(252, 243, 231);
  }

</style>
