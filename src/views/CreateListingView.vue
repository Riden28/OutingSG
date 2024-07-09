<template> 
    <NavBar /> 
    <div class="cover">
    <form action="">
      <div class="top v-row">
        <div class="v-col-5 images">
          <input
            type="file"
            multiple
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="onFileChange"
            ref="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        <div id="preview">
          <img v-if="url" :src="url" />
        </div>
        <div class="v-col-7">
          <h3>Create Outing</h3>
          <br>
          <div class="name">
            <h6>Outing Name</h6>
            <v-text-field class="text-grey" placeholder="Name Here"></v-text-field>
          </div>
          <div class="outing-description">
            <h6>Outing Description</h6>
            <v-text-field class="text-grey desc" placeholder="Description Here"></v-text-field>
          </div>
        </div>
      </div>
      <div class="bottom v-row">
        <div class="v-col-5">
          <!-- here goes the google maps selector -->
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

        </div>

        <div class="v-col-7">
          <div class="row1">
            <div class="category">
              <h4>Category</h4>
              <input type="checkbox" v-model="toggle" true-value="food'" false-value="no"/> F&B
              <br>
              <input type="checkbox" v-model="toggle" true-value="nature" false-value="null"/> Nature
              <br>
              <input type="checkbox" v-model="toggle" true-value="cultural" false-value="null"/> Cultural
              <br>
              <input type="checkbox" v-model="toggle" true-value="entertainment" false-value="null"/> Entertainment
              <br>
              <input type="checkbox" v-model="toggle" true-value="outdoor" false-value="null"/> Outdoor
              <br>
              <input type="checkbox" v-model="toggle" true-value="educational" false-value="null"/> Educational
              <br>
              <input type="checkbox" v-model="toggle" true-value="adventure" false-value="null"/> Adventure
              <br>
              <input type="checkbox" v-model="toggle" true-value="shopping" false-value="null"/> Shopping
              <br>
              <input type="checkbox" v-model="toggle" true-value="wellness" false-value="null"/> Wellness
              <br>
              <input type="checkbox" v-model="toggle" true-value="events" false-value="null"/> Events
              <br>
            </div>
            <div class="price">
              <h4>Price: {{ picked }}</h4>
              <input type="radio" id="one" value="One" v-model="picked" />
              <label for="one">One</label>

              <input type="radio" id="two" value="Two" v-model="picked" />
              <label for="two">Two</label>

              <input type="radio" id="three" value="Three" v-model="picked" />
              <label for="three">Three</label>
            </div>
            <div class="recommended-pax">
              <h4>Recommended Pax</h4>
              <input type="range" v-model="sliderValue" min="1" max="20" />
              <p>Number: {{ sliderValue }}</p>
            </div>
          </div>
          <div class="row2">
            <div class="area">
              <h4>Location</h4>
              <input type="checkbox" v-model="toggle" true-value="north" false-value="no"/> North
              <br>
              <input type="checkbox" v-model="toggle" true-value="south" false-value="null"/> South
              <br>
              <input type="checkbox" v-model="toggle" true-value="east" false-value="null"/> East
              <br>
              <input type="checkbox" v-model="toggle" true-value="west" false-value="null"/> West
            </div>
            <div class="location">
              <h4>Exact Location: </h4>
              <input v-model="message" value = [] placeholder="location" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
    <OutingSGFooter/>
</template> 
 
<script> 
  import NavBar from '@/components/NavBar.vue'; 
  import OutingSGFooter from '@/components/Footer.vue';
  import { GoogleMap, Marker } from 'vue3-google-map';
 
  export default { 
    name: 'create', 
    components: { 
      NavBar,
      OutingSGFooter,
      // VueSlideBar
      
    }, 
    data() {
      return {
        apikey: import.meta.env.VITE_API_KEY,
        picked: '',
        sliderValue: 20,
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
  }; 
  // const setPlace = (place) => {
  //     coords.value.lat = place.geometry.location.lat()
  //     coords.value.lng = place.geometry.location.lng()
  //     // Update the location details
  //     locationDetails.value.address = place.formatted_address
  //     locationDetails.value.url = place.url
  //   }
    
</script>

<style scoped>
  .cover {
    background-color: white;
  }
  input, .category {
    color: black;
  }
  .v-row {
    width: 100%;
  }
  .v-col-7 {
    color:black;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .row2 {
    display: flex;
    justify-content: start;
  }
  label {
    margin-right: 10px;
  }
  .location {
    margin-left: 3rem;
  }
  .text-grey input {
      color: lightgray !important;
      width: 50%;
    }

    .desc {
      height: 200px;
    }

    .images {
      display: flex;
      justify-content: center;
      align-items: center;
    }
</style>
