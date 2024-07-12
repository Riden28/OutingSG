    <template>
        <NavBar/>
        <div class="cover">
            <!-- row for categories -->
            <ListingInformation/>
    
            <!-- row for price, location, pax and rating -->
            <!-- row for pic display + description -->
            <ListingRating/>
            <!-- row for reviews, filtering and adding -->
            <ReviewActions/>
    
            <!-- row for reviews -->
            <Review/>
            <Review/>
            <Review/>
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
            name: 'listing',
            components: {
                NavBar, OutingSGFooter, ImageCarousel, ListingInformation, ListingRating, ReviewActions, Review
            },
        };
    </script>
    
    <style scoped>
        
    
        .cover {
            margin-left: 3rem;
            margin-right: 3rem;
        }
    
    
    </style>