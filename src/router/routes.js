import { RouterView } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('src/pages/index-page.vue'),
    meta: {
      layout: 'LayoutApp',
      title: 'index',
      requireAuth: true,
    },
  },
];
