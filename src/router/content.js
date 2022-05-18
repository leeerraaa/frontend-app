import ContentLayout from '@/layouts/ContentLayout.vue';

export default {
  path: 'documents',
  name: 'content',
  component: ContentLayout,

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
