import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';
import ViteComponents from 'vite-plugin-components';
import WindiCSS from 'vite-plugin-windicss';
//import viteSSR from 'vite-ssr/plugin.js';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'app')}/`,
      '@/': `${path.resolve(__dirname)}/`,
    },
  },
  plugins: [
    //viteSSR(),
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: 'app/pages',
      extensions: ['vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDir: 'app/layouts',
    }),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],

      dirs: ['app/components'],
      deep: true,
      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      scan: {
        include: ['app/**/*.{vue,html,jsx,tsx}'],
        exclude: ['node_modules', '.git'],
      },
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
});
