import LoginLayout from '@/layouts/LoginLayout.vue';
import store from '@/store';

export default {
  path: '/',
  name: 'service',
  component: LoginLayout,

  beforeEnter: async (to, from, next) => {
    const isLogged = store.getters['auth/getUserLogged'];

    if (isLogged) {
      next({
        name: 'content.history',
      });
    } else {
      next();
    }
  },

  redirect: {
    name: 'service.login',
  },

  children: [
    {
      path: 'login',
      name: 'service.login',
      component: () => import('@/views/Login.vue'),
    },
  ],
};
