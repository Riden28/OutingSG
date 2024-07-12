<template>
    <NavBar/>

    <div class="wrapper"> 
        <div class="sidebar"> 
            <h3 class="title">Filters</h3><hr>

            <h4 class="title">Category</h4> 
            <input type="checkbox" id="fnb"><label for="fnb">F&B</label><br>
            <input type="checkbox" id="nature"><label for="fnb">Nature</label><br>
            <input type="checkbox" id="cultural"><label for="fnb">Cultural</label><br>
            <input type="checkbox" id="entertainment"><label for="fnb">Entertainment</label><br>
            <input type="checkbox" id="outdoor"><label for="fnb">Outdoor</label><br>
            <input type="checkbox" id="educational"><label for="fnb">Educational</label><br>
            <input type="checkbox" id="adventure"><label for="fnb">Adventure</label><br>
            <input type="checkbox" id="shopping"><label for="fnb">Shopping</label><br>
            <input type="checkbox" id="wellness"><label for="fnb">Wellness</label><br>
            <input type="checkbox" id="events"><label for="fnb">Events</label><br>

            <h4 class="title">Price</h4> 
            <input type="checkbox" id="price1"><label for="price1">$</label><br>
            <input type="checkbox" id="price2"><label for="price2">$$</label><br>
            <input type="checkbox" id="price3"><label for="price3">$$$</label><br>

            <h4 class="title">Location</h4> 
            <input type="checkbox" id="north"><label for="north">North</label><br>
            <input type="checkbox" id="south"><label for="south">South</label><br>
            <input type="checkbox" id="east"><label for="east">East</label><br>
            <input type="checkbox" id="west"><label for="west">West</label><br>
            <input type="checkbox" id="central"><label for="central">Central</label><br>

            
            <h4 class="title">Recommended Pax</h4> 

            <br><button>Filter</button><br><br>

            <h3 class="title">Sort</h3>
            <select name="sort" id="sort">
                <option value="category">Category</option>
                <option value="price">Price</option>
            </select>
            <img src="../assets/icons/up.png" v-on:click="sorting = false" v-if="sorting" class="sortIcon">
            <img src="../assets/icons/down.png" v-on:click="sorting = true" v-else class="sortIcon">

        </div> 
  
        <div class="main"> 
            <h2 class="title">Outings</h2>
            <ListingsDisplay/>
            
        </div> 
    </div> 


    <OutingSGFooter/>
</template>
  
<script>
import NavBar from '@/components/NavBar.vue';
import OutingSGFooter from '@/components/Footer.vue';
import ListingsDisplay from '@/components/ListingsDisplay.vue';

export default {
    name: 'home',
    
    components: {
        NavBar, 
        OutingSGFooter,
        ListingsDisplay
    },

    data() {
        return {
            sorting: true
        }
    }
};

</script>

<style scoped>

label {
    padding-left: 5px;
    font-weight: 100;
}

.wrapper { 
    display: flex; 
} 

.main { 
    width: 80%; 
    height: 200vh; 
    min-height: 1000px; 
    display: flex; 
    flex-direction: column; 
    background: white; 
    padding-left: 10px; 
    margin-top: 55px;
    padding: 30px;
} 

.sidebar { 
    width: 25%; 
    height: 100vh; 
    min-height: 200px; 
    overflow: auto; 
    background: var(--light-grey);
    position: -webkit-sticky; 
    position: sticky; 
    top: 55px;
    padding: 10px;
    padding-left: 20px;
} 

li { 
    list-style: none;
} 

.title {
    font-weight: 800;
}

select {
    padding: 10px 20px;
    border: 0px;
}

.sortIcon {
    background-color: white;
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
}
  
</style>