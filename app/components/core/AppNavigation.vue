<template lang="pug">
aside.relative.bg-blue-gray-800.h-screen.w-72.hidden(class="sm:block")
  .flex.flex-col.justify-center.items-center.py-5(v-if="isLoggedIn && currentUser")
    .w-25.h-25.rounded-full.bg-cover.bg-center.bg-blue-100.mb-3(:style="{backgroundImage: `url(${currentUser.avatar})`}")
    .text-lg.font-weight-medium.text-gray-50(v-text="currentUser.displayname")
    .text-sm.text-gray-400(v-text="currentUser.mail")

</template>

<script lang="ts" setup>
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';
  const locator = injectStrict(LocatorKey);
  const authService = locator.getAuthService();
  const stateService = locator.getStateService();

  const currentUser = stateService.getStateItem('currentUser');
  const isLoggedIn = authService.isLoggedIn();
</script>
