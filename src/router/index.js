import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/indexPage.vue'
import Home from '@/views/Home/indexPage.vue'
import Friend from '@/views/Friend/indexPage.vue'
import About from '@/views/About/indexPage.vue'
import Archives from '@/views/Archives/indexPage.vue'
import Categories from '@/views/Categories/indexPage.vue'
import Tags from '@/views/Tags/indexPage.vue'
import Details from '@/views/Details/indexPage.vue'
import NotFound from '@/views/404NotFound/indexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/friend',
          name: 'friend',
          component: Friend
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/archives',
          name: 'archives',
          component: Archives
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/tags',
          name: 'tags',
          component: Tags
        },
        {
          path: '/details/:id?',
          name: 'details',
          component: Details
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound}
  ],
})

export default router
