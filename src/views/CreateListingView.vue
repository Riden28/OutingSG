<template> 
    <NavBar /> 
    <form action="">
      <div class="upper">

      </div>
      <div class="lower">
        <div class="left">

        </div>
        <div class="right">
          <div class="row1">
            <div class="category">
              <select name="category" id="">
                <option value="F&B">F&B</option>
                <option value="nature">nature</option>
              </select>
            </div>
            <div class="price"></div>
            <div class="recommended-pax"></div>
          </div>
          <div class="row2">
            <div class="area"></div>
            <div class="location"></div>
          </div>
        </div>
    </div>
    </form>


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

<style scoped>

</style>
