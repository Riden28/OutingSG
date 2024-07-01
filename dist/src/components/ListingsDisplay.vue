<template>
    <div class="text-h5 pl-16">Recommendation</div>

    <v-container fluid class="mx-auto">
        <v-infinite-scroll
            height="700"
            color=var(--secondary)
            mode="manual"
            @load="load"
            empty-text="No more recommended listings"
        >
                <v-row align="start" justify="center">
                    <v-col  v-for="listing in listings" cols="auto">
                        <v-card
                        class="mx-1"
                        height="280"
                        width="417"
                        rounded="xl"
                        :href="listing.listingPage">
                        <v-img
                        :src="listing.url"
                        height="174px"
                        cover
                        ></v-img>
                        <v-btn
                            icon="mdi-bookmark-outline"
                            base-color="transparent"
                            variant="plain"
                            @click.prevent="console.log('hi');"
                        > 
                            <v-icon
                                icon="mdi-bookmark"
                                size="50"
                                color="white"
                
                            ></v-icon>
                        </v-btn>
                        
                                <v-card-title>
                                    {{ listing.name }}
                                </v-card-title>
                            
                                <v-card-subtitle>
                                    {{ listing.details }}
                                </v-card-subtitle>

                                <v-card-title class="price">
                                    {{ listing.price }}
                                </v-card-title>
                            
                            <!-- replace console.log with function to save outing -->
                            
                        </v-card>
                        
                    </v-col>
                
                </v-row>
        </v-infinite-scroll>
        </v-container>
</template>


<script>

export default {
    name: 'ListingsDisplay',
    // props() { // pass in listing details

    // },
    data: () => ({
            // retrieve the first 10 listings
            listings: [
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/8940309/pexels-photo-8940309.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/7495924/pexels-photo-7495924.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/23440189/pexels-photo-23440189/free-photo-of-loneliness.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/23408294/pexels-photo-23408294/free-photo-of-two-people-are-sitting-on-the-edge-of-a-pier.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22757188/pexels-photo-22757188/free-photo-of-a-black-and-white-photo-of-a-woman-and-man.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22240924/pexels-photo-22240924/free-photo-of-a-black-and-white-photo-of-a-person-on-the-balcony.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22743820/pexels-photo-22743820/free-photo-of-a-black-and-white-photo-of-a-spiral.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/14703428/pexels-photo-14703428.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'}
            ]
        }),

    methods: {
        // on every load retrieve another 10 listings
      load ({ done }) {
        setTimeout(() => {
          this.listings.push(...[
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/23408294/pexels-photo-23408294/free-photo-of-two-people-are-sitting-on-the-edge-of-a-pier.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22757188/pexels-photo-22757188/free-photo-of-a-black-and-white-photo-of-a-woman-and-man.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22240924/pexels-photo-22240924/free-photo-of-a-black-and-white-photo-of-a-person-on-the-balcony.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22743820/pexels-photo-22743820/free-photo-of-a-black-and-white-photo-of-a-spiral.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/14703428/pexels-photo-14703428.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', price: '$$', listingPage: 'Listing1'}
          ])

          done('ok')
        }, 1000)
      },
    },
}



</script>

<style scoped>
.v-btn {
  position: absolute;
  top: -6px;
  right: 8px;
}

.price {
    position: absolute;
    right: 0px;
    bottom: 0px;
}
</style>