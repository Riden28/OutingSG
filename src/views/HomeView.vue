<template>
  <NavBar/>
  <OutingSGFooter/>

</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  import OutingSGFooter from '@/components/Footer.vue';

  export default {
    name: 'home',
    
    components: {
      NavBar, OutingSGFooter
    },
  };
</script>

<style>


</style>