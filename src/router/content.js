import ContentLayout from '@/layouts/ContentLayout.vue';
import store from '@/store';

export default {
  path: 'documents',
  name: 'content',
  component: ContentLayout,

  beforeEnter: async (to, from, next) => {
    const isLogged = store.getters['auth/getUserLogged'];
    await store.dispatch('auth/userGetInfo');

    if (!isLogged) {
      next({
        name: 'service.login',
      });
    } else {
      next();
    }
  },

  redirect: {
    name: 'content.history',
  },

  children: [
    {
      path: 'history',
      name: 'content.history',
      component: () => import('@/views/Content/History.vue'),
    },

    {
      path: 'form',
      name: 'content.form',
      component: () => import('@/views/Content/Form.vue'),
    },
  ],
};
