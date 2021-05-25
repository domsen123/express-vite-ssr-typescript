import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';

const routes = setupLayouts(generatedRoutes);

export const createRouter = () =>
  _createRouter({
    history: (import.meta as any).env.SSR
      ? createMemoryHistory()
      : createWebHistory(),
    routes,
  });
