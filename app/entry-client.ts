import { createVueApp } from './main';

const { app, router } = createVueApp({ isClient: true });

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app', true);
  // // it is possible to debug differences of SSR / Hydrated app state
  // // by adding a timeout between rendering the SSR version and hydrating it later
  // window.setTimeout(() => {
  //   console.log('The app has now hydrated');
  //   app.mount('#app', true);
  // }, 5000);
});
