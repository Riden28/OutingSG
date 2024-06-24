// import './assets/main.css'
// import './assets/base.css'
import './assets/bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // this made the icons appear
import './router/bootstrap.js'


const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(router)
app.use(vuetify)
app.mount('#app')
