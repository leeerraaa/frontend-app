import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

import Login from './login';
import Content from './content';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainLayout,

    // beforeEnter: async (to, from, next) => {
    //   next();
    // },

    children: [Login, Content],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Documents';
});

export default router;
