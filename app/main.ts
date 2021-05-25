import 'virtual:windi.css';
import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import { createHead } from '@vueuse/head';

export const createApp = () => {
  const app = createSSRApp(App);
  const router = createRouter();

  const head = createHead();
  app.use(router).use(head);
  return { app, router };
};
