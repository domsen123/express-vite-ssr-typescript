import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';

export const createApp = () => {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  return { app, router };
};
