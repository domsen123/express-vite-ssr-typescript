<template lang="pug">
header.header.w-full.bg-white.px-6.hidden.h-16.justify-between(class="sm:flex")
  .flex.flex-1
  .flex.flex-1.justify-end
    .flex.items-center(v-if="isLoggedIn && currentUser")
      .rounded-full.w-8.h-8.bg-center.bg-cover.mr-2(:style="{backgroundImage: `url(${currentUser.avatar})`}")
      .font-weight-medium(v-text="currentUser.displayname")
header.w-full.bg-white.py-5.px-6.shadow(class="sm:hidden") Mobile
</template>

<script lang="ts" setup>
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';
  const locator = injectStrict(LocatorKey);
  const currentUser = locator.getStateService().getStateItem('currentUser');
  const isLoggedIn = locator.getAuthService().isLoggedIn();
</script>
