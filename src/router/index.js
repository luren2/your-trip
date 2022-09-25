import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/favor',
      component: () => import('@/views/favor/index.vue'),
    },
    {
      path: '/order',
      component: () => import('@/views/order/index.vue'),
    },
    {
      path: '/message',
      component: () => import('@/views/message/index.vue'),
    },
    {
      path: '/city',
      component: () => import('@/views/city/index.vue'),
      meta: {
        hideTabBar: true,
      },
    },
    {
      path: '/search',
      component: () => import('@/views/search/index.vue'),
      meta: {
        hideTabBar: true,
      },
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/detail/index.vue'),
      meta: {
        hideTabBar: true,
      },
    },
  ],
});

export default router;
