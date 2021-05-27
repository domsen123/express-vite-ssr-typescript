<template lang="pug">
header.header.w-full.bg-white.px-6.hidden.h-16.justify-between(class="sm:flex")
  .flex.flex-1
  .flex.flex-1.justify-end
    .flex.items-center.mr-3(v-if="isLoggedIn && currentUser")
      .rounded-full.w-8.h-8.bg-center.bg-cover.mr-2(:style="{backgroundImage: `url(${currentUser.avatar})`}")
      .font-weight-medium(v-text="currentUser.displayname")
    AppButton(text="SignOut" @click="onSignOutClick")
header.w-full.bg-white.py-5.px-6.shadow(class="sm:hidden") Mobile
</template>

<script lang="ts" setup>
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const locator = injectStrict(LocatorKey);
  const authService = locator.getAuthService();

  const currentUser = locator.getStateService().getStateItem('currentUser');
  const isLoggedIn = authService.isLoggedIn();

  const onSignOutClick = async () => {
    try {
      await authService.signOut();
      await router.push('/auth');
    } catch (error) {}
  };
</script>
