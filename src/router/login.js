import LoginLayout from '@/layouts/LoginLayout.vue';

export default {
  path: '/',
  name: 'service',
  component: LoginLayout,

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
