    <template>
        <NavBar/>
        <div class="cover">
            <div class="main_body">
            <!-- row for categories -->
                <ListingInformation :outingID=listingID />
                <!-- row for price, location, pax and rating -->
                <!-- row for pic display + description -->
                <ListingRating :outingID=listingID />
                <!-- row for reviews, filtering and adding -->
                <ReviewActions/>
        
                <!-- row for reviews -->
                <Review/>
                <Review/>
                <Review/>
            </div>
        </div>
        
        <OutingSGFooter />
    </template>
    
    <script>
    
    import '../assets/main.css';
        import '../assets/bootstrap.css';
        import '../router/bootstrap.js';
        import '../assets/loginRegister.css';
        import NavBar from '../components/NavBar.vue';
        import OutingSGFooter from '@/components/Footer.vue';
        import ImageCarousel from '@/components/ImageCarousel.vue';
        import ListingInformation from '@/components/ListingInformation.vue';
        import ListingRating from '@/components/ListingRating.vue';
        import ReviewActions from '@/components/ReviewActions.vue';
        import Review from '@/components/Review.vue';
        export default {
            name: 'individualListing',
            components: {
                NavBar, OutingSGFooter, ImageCarousel, ListingInformation, ListingRating, ReviewActions, Review
            },
            data() {
                return {
                listingID: null
                };
            },
            methods: {
                fetchListingDetails() {
                const listingID = this.$route.params.listingID;
                // Use listingID to fetch listing details from an API or other source
                }
            },
            created() {
                this.listingID = this.$route.params.listingID;
                this.fetchListingDetails();
            }
        };
    </script>
    
    <style scoped>
        .cover {
            margin-left: 3rem;
            margin-right: 3rem;
        }
        
        .main_body {
            margin-top: 55px;
            position: relative;
        }
    
    </style>