declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare interface Window {
  // extend the window
}

declare module 'isomorphic-cookie';
