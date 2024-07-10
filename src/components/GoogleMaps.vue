<template>
    <GMapAutocomplete
        placeholder="Search location here"
       :options="{
            bounds: {north: 1.4, south: 1.2, east: 104, west: 102},
            strictBounds: true
       }"
    />
          <GMapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 40vw; height: 20rem"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: false
      }"
      ref="gmap"/>

</template>

<script>
    import { GoogleMap, Marker } from 'vue3-google-map';
    export default {
        name: 'GoogleMaps',
        components: {

        },
        data () {
            return {
                apikey: import.meta.env.VITE_API_KEY,
                center: { lat: 51.5072, lng: 0.1276 },
                map: null,
                autocomplete: null,
                currentPlace: null,
                markers: [],
                places: [],
                isDragging: false,
                files: [],
                url: null,
            }
        },
        mounted() {
            this.geolocate();
        },
        methods: {
            setPlace(place) {
            if (place && place.geometry) {
                this.currentPlace = place;
                this.center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
                };
                this.reverseGeocode(this.center.lat, this.center.lng);
            }
            },
            geolocate() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
            });
            },
            reverseGeocode(lat, lng) {
            const geocoder = new google.maps.Geocoder();
            const latlng = { lat, lng };
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK') {
                if (results[0]) {
                    const addressComponents = results[0].address_components;
                    const postalCode = addressComponents.find(component =>
                    component.types.includes('postal_code')
                    ).long_name;
                    const fullName = results[0].formatted_address;

                    console.log(`Full Name: ${fullName}, Postal Code: ${postalCode}`);
                    // Save the full name and postal code as needed
                } else {
                    console.log('No results found');
                }
                } else {
                console.log('Geocoder failed due to: ' + status);
                }
            });
            },
            onFileChange(e) {
            const file = e.target.files[0],
            url = URL.createObjectURL(file)
            } 
        }
            }
</script>

<style>
    
</style>