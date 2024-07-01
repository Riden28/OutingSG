// import './assets/main.css'
// import './assets/base.css'
import './src/assets/bootstrap.css';

// import { createApp } from 'vue'
// Use Vue and Vuetify from the global scope (index.html)
const { createApp } = Vue;
const { createVuetify } = Vuetify;
import App from './src/App.vue';
import router from './src/router/index.js';
// Vuetify
// import '../node_modules/vuetify/__styles.scss'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import '../node_modules/@mdi/font/css/materialdesignicons.css' // this made the icons appear
import './src/router/bootstrap.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPet5px7jjw68t8ch3ejok_l0-OQSVv48",
  authDomain: "outingsg.firebaseapp.com",
  projectId: "outingsg",
  storageBucket: "outingsg.appspot.com",
  messagingSenderId: "38046501686",
  appId: "1:38046501686:web:5a5b5797c9f3dbb28f4197", 
  measurement_id: "G-RGL19M9RBZ"
};

// Initialize Firebase and get auth
const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);

const app = createApp(App);

const vuetify = createVuetify({
  components: Vuetify.components,
  directives: Vuetify.directives
});

app.use(router);
app.use(vuetify);
app.mount('#app');

export default auth;