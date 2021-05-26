<template lang="pug">
.flex
  AppNavigation
  .relative.w-full.h-screen.flex.flex-col.overflow-y-hidden.bg-gray-100
    AppBar
    .w-full.h-screen.overflow-x-hidden.flex
      main.w-full.flex-grow.p-6
        router-view(v-bind="$attrs")
</template>
