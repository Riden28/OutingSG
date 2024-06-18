<template>
    <v-container>
        <v-row align="start">
            <v-col v-for="listing in listings" cols="auto">
                <v-card
                    height="280"
                    width="417"
                    rounded="xl"
                    :href="listing.listingPage">
                    <v-img
                        :src="listing.url"
                        height="174px"
                        cover
                    ></v-img>

                    <v-card-title>
                        {{ listing.name }}
                    </v-card-title>
                    
                    <v-card-subtitle>
                        {{ listing.details }}
                    </v-card-subtitle>

                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>


<script>

export default {
    name: 'ListingsDisplay',
    // props() {

    // },
    data() {
        return {
            listings: [
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/8940309/pexels-photo-8940309.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/7495924/pexels-photo-7495924.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/23440189/pexels-photo-23440189/free-photo-of-loneliness.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/23408294/pexels-photo-23408294/free-photo-of-two-people-are-sitting-on-the-edge-of-a-pier.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22757188/pexels-photo-22757188/free-photo-of-a-black-and-white-photo-of-a-woman-and-man.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22240924/pexels-photo-22240924/free-photo-of-a-black-and-white-photo-of-a-person-on-the-balcony.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/22743820/pexels-photo-22743820/free-photo-of-a-black-and-white-photo-of-a-spiral.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'},
                {name: 'Listing 1', details: 'Listing Details', url:'https://images.pexels.com/photos/14703428/pexels-photo-14703428.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', listingPage: 'Listing1'}
            ]
        }
    }
}



</script>