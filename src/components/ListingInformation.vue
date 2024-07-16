<template>
    <div class="names" style="padding-bottom: 30px;">
        <div class=" categoryname">
            <span v-for="(category, index) in outing_details.category">
                {{category}}
                <span v-if="index != Object.keys(outing_details.category).length - 1">, </span>
            </span>
        </div>
        <!-- row for outing name & edit outing button -->
        <div class="edit">
          <div class="outingname">
            <h2 class="outing-name"><b>{{outing_details.name}}</b></h2>
          </div>
          <div>
            <router-link to="/edit" class="btn btn-primary listingBtns" role="button" style='margin-right: 1px;'>
                <img src='../assets/icons/gif/edit.gif' style='width: 30px;'><span style='color:black;'> Edit Listing</span>
            </router-link>
        
            <p class="btn btn-primary listingBtns" role="button" @click="share()">
                <img src='../assets/icons/gif/share.gif' style='width: 30px;'>
            </p>
          </div>
        </div>

        <!-- row for location name -->
        <div class="v-row">
            <div class="v-col-10 outingname">
                <p class="outingname">Location: {{outing_details.location}}</p>
            </div>
        </div>
    </div>
    <div>
    <ImageCarousel :slides="carousel_images" carousel_height="415"/>
    </div>

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
                category: [],
                location: '',
                description: '',
                images: [],
                showWords: false,
            },
            carousel_images: []
        }
    },
    methods: {
        share(){
            var shareUrl = document.createElement('input'),
            text = window.location.href;

            document.body.appendChild(shareUrl);
            shareUrl.value = text;
            shareUrl.select();
            document.execCommand('copy');
            document.body.removeChild(shareUrl);
        }
    },
    async mounted() {
    try {
        const docRef = doc(db, "outings", this.outingID);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            this.outing_details = docSnap.data();
            console.log(this.outing_details.images);
            for (let image of this.outing_details.images) {
                console.log(image);
                this.carousel_images.push({
                    url: image
                });
            }
            
        } else {
        console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}
</script>

<style scoped>
    .outing-name {
        font-weight: bold;
    }


    p {
        font-family: sans-serif;
        color: black;
    }

    p .outingname {
      size: 100px;
    }

    .names{
        padding: 0px 24px 0px 24px;
        margin-top: 100px;
    }

    .edit {
        display: flex;
        justify-content: space-between;
    }

    .btn{
        background-color: var(--secondary);
        border: solid var(--secondary);
        color: white !important;
    }

    .btn:hover {
        background-color: var(--transparent);
        border: solid var(--secondary);
        color: black !important;
    }

    .listingBtns {
        background-color: white;
        margin-right: -20px;
        margin-left: 20px;
    }
    
    .listingBtns:hover {
        background-color: white;
        border: solid black;
    }
</style>