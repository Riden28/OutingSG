<template>
    <div class="names">
        <div class=" categoryname">
            <p>{{outing_details.category}}</p>
        </div>
        <!-- row for outing name & edit outing button -->
        <div class="edit">
          <div class="outingname">
            <p class="outing-name">{{outing_details.name}}</p>
          </div>
          <div>
            <router-link to="/edit" class="btn btn-primary" role="button">Edit Listing</router-link>
          </div>
        </div>

        <!-- row for location name -->
        <div class="v-row">
            <div class="v-col-10 outingname">
                <p class="outingname">{{outing_details.location}}</p>
            </div>
        </div>
    </div>
      <ImageCarousel/>


</template>

<script>
import ImageCarousel from './ImageCarousel.vue';
export default {
    name: 'ListingInformation',
    components: {
        ImageCarousel
    },
    data() {
        return {
            outing_details: {
                name: '',
                category: '',
                location: '',
                description: '',
                images: []
            }
        }
    }
}
</script>

<style scoped>
    .outing-name {
        font-weight: bold;
    }

    p {
        font-family: sans-serif;
        color: white;
    }

    p .outingname {
      size: 100px;
    }

    .v-carousel {
        padding: 0px 0px 0px 0px !important;
    }
    .names{
        padding: 0px 24px 0px 24px;
    }

    .edit {
        display: flex;
        justify-content: space-between;
    }
</style>