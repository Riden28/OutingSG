<template> 
    <NavBar /> 
    
    <OutingSGFooter/>
</template> 
 
<script> 
  import NavBar from '@/components/NavBar.vue'; 
  import OutingSGFooter from '@/components/Footer.vue';
 
  export default { 
    name: 'create', 
    components: { 
      NavBar,
      OutingSGFooter
      
    }, 
  }; 
</script>
