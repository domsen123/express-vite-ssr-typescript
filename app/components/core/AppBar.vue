<template lang="pug">
header.header.w-full.bg-white.px-6.hidden.h-16.justify-between(class="sm:flex")
  .flex.flex-1
  .flex.flex-1.justify-end
    AppButton(text="SignOut" @click="onSignOutClick")
header.w-full.bg-white.py-5.px-6.shadow.flex.justify-between(class="sm:hidden")
  .flex.flex-1
    AppButton(icon)
      uil-bars
  .flex.flex-1.justify-end
    AppButton(@click="onSignOutClick" icon)
      uil-signout
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';

  const router = useRouter();
  const locator = injectStrict(LocatorKey);
  const authService = locator.getAuthService();

  const onSignOutClick = async () => {
    try {
      await authService.signOut();
      await router.push('/auth');
    } catch (error) {}
  };
</script>
