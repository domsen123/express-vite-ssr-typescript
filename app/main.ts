import 'virtual:windi.css';
import './styles/main.css';
import App from './App.vue';
import { createApp, createSSRApp } from 'vue';
import { createRouter } from './router';
import { createHead } from '@vueuse/head';
import locator from './plugins/locator';
import { Request, Response } from 'express';

interface VueSSRHandler {
  isClient: boolean;
  url?: string;
  request?: Request;
  response?: Response;
}

export const createVueApp = (options: VueSSRHandler) => {
  const { isClient, request, response } = options;
  const app = isClient ? createApp(App) : createSSRApp(App);
  const router = createRouter();

  // if (isClient) {
  //   console.log('client');
  // } else {
  //   console.log('server');
  // }

  const _locator = locator.install({ app, isClient, request, response });
  const appStateService = _locator.getStateService();
  const authService = _locator.getAuthService();

  const head = createHead();
  app.use(router).use(head);

  router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth) {
      try {
        await authService.checkAuth();
      } catch (error) {
        if (error.status === 401) {
          return '/auth';
        }
      }
    }
  });
  return { app, router, head };
};
