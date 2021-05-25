<template lang="pug">
router-view
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head';
  useHead({
    title: 'express-vite-ssr-typescript',
    meta: [
      { name: 'description', content: 'express-vite-ssr-typescript' },
      { name: 'description', content: 'express-vite-ssr-typescript' },
      { property: 'og:title', content: 'express-vite-ssr-typescript' },
    ],
  });
</script>
