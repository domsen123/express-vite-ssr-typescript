import { createVueApp } from './main';

const { app, router } = createVueApp({ isClient: true });

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app');
});
