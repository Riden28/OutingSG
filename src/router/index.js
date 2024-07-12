import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgetPwView from '../views/ForgetPwView.vue'
import ResetPwView from '../views/ResetPwView.vue'
// import ListingView from '../views/ListingView.vue'
import CreateListingView from '@/views/CreateListingView.vue'
import IndividualView from '../views/IndividualView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgetPw',
      name: 'forgetPw',
      component: ForgetPwView,
    },
    {
      path: '/resetPw',
      name: 'resetPw',
      component: ResetPwView,
    },

    {
      path: '/listing/:listingID',
      name: 'individualListing',
      component: IndividualView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateListingView,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
