import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/Layout/indexPage.vue';
import Home from '@/views/Home/indexPage.vue';
import Friend from '@/views/Friend/indexPage.vue';
import About from '@/views/About/indexPage.vue';
import Archives from '@/views/Archives/indexPage.vue';
import Categories from '@/views/Categories/indexPage.vue';
import SubCategories from '@/views/SubCategories/indexPage.vue';
import Tags from '@/views/Tags/indexPage.vue';
import Details from '@/views/Details/indexPage.vue';
import NotFound from '@/views/404NotFound/indexPage.vue';

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
          component: Home,
          meta: { title: 'NKDShinKu' },
        },
        {
          path: '/friend',
          name: 'friend',
          component: Friend,
          meta: { title: '友链' },
        },
        {
          path: '/about',
          name: 'about',
          component: About,
          meta: { title: '关于我' },
        },
        {
          path: '/archives',
          name: 'archives',
          component: Archives,
          meta: { title: '归档' },
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories,
          meta: { title: '分类' },
        },
        {
          path: '/categories/:subName',
          name: 'sub-categories',
          component: SubCategories,
          meta: {
            title: (route) => `分类: ${route.params.subName}`,
          },
        },
        {
          path: '/tags',
          name: 'tags',
          component: Tags,
          meta: { title: '标签' },
        },
        {
          path: '/details/:id?',
          name: 'details',
          component: Details,
          meta: { title: '详情' },
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: '404 - 页面未找到' } }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from, next) => {
  // 判断是否有动态标题函数
  if (to.meta && typeof to.meta.title === 'function') {
    // 如果是函数，执行并传入当前路由
    document.title = to.meta.title(to);
  } else if (to.meta && to.meta.title) {
    // 如果是静态标题
    document.title = to.meta.title;
  } else {
    // 默认标题
    document.title = 'NKDShinKu';
  }
  next();
});



export default router;
