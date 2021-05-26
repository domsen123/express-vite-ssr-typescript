import 'virtual:windi.css';
import App from './App.vue';
import { createSSRApp, provide } from 'vue';
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
  const app = createSSRApp(App);
  const router = createRouter();

  if (isClient) {
    console.log('client');
  } else {
    console.log('server');
  }

  locator.install({ app, isClient, request, response });

  const head = createHead();
  app.use(router).use(head);
  return { app, router };
};
