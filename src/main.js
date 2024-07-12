// import './assets/main.css'
// import './assets/base.css'
// import './assets/bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueSlideBar from 'vue-slide-bar'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // this made the icons appear
import './router/bootstrap.js'
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})


app.use(router)
app.use(vuetify)
// app.mount('#app')
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_API_KEY,
    libraries: "places"
  },
}).mount('#app');
