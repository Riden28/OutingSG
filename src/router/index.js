import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgetPwView from '../views/ForgetPwView.vue'
import ResetPwView from '../views/ResetPwView.vue'
import ListingView from '../views/ListingView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import CreateListingView from '@/views/CreateListingView.vue'
import ExploreView from '@/views/ExploreView.vue'

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
      path: '/listing',
      name: 'listing',
      component: ListingView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfileView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateListingView,
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
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
