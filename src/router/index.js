import { createRouter, createWebHashHistory } from 'vue-router'
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
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: '/categories/:name?',
          name: 'categories',
          component: Categories
        },
        {
          path: '/tags/:name?',
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
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth', }
  },

})

export default router

//  挂载路由守卫
// to 将访问哪一个路径
// from 代表从哪个路径跳转而来
// next 是一个函数,表示放行
// router.beforeEach((to, from, next) => {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
//   window.scrollY = 0;
//   next();
// });
