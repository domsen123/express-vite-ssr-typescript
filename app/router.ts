import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';

export const createRouter = () =>
  _createRouter({
    history: (import.meta as any).env.SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes: [
      {
        path: '/',
        component: () => import('./pages/page1.vue'),
      },
      {
        path: '/page2',
        component: () => import('./pages/page2.vue'),
      },
    ],
  });
