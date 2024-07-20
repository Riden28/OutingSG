<template>
  <div>
    <NavBar />
  </div>
  
  <div class="content">

    <v-row>
      <v-col>
        <img src='../assets/AboutUs/pic1.jpg' class="aboutUsPic">
      </v-col> 
      <v-col class='aboutUsContent'>
        <h3><b>About OutingSG</b></h3>
        <p>
          We are a group of 5 year 1 SMU Information System students who created outingSG for the HEAP Hackathon.
          <br><br>
          OutingSG is a one-stop shop for crafting your perfect adventure! Whether you're seeking quality time with friends, a romantic date with your significant other, a fun-filled family outing, or even a solo exploration, outingSG curates a diverse list of ideas to fill your free time. Dive into our suggestions and discover hidden gems, exciting activities, and unique experiences in Singapore, all designed to make your outing truly HEAP.
          <br><br>
          As we have immense passion for OutingSG, we have faith that it could make a difference for society and hope that even after HEAP, the project could be further developed into a viable solution and reduce social isolation. 
        </p>
      </v-col>
    </v-row>

  </div>
  
  <OutingSGFooter class='OutingSGFooter'/>
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
    margin-top: 60px;
    background-color: rgb(252, 243, 231);
  }

  .aboutUsPic {
    margin: 20px;
    width: 400px;
    text-align: right !important;
  }

  .aboutUsContent{
    text-align: left !important;
    padding: 100px !important;
  }

  .OutingSGFooter {
    margin-bottom: 0px;
    bottom: 0;
    position: fixed !important;
  }   
</style>
