<template>
  <div>
    <router-link to="/auth">Auth</router-link>
    <pre v-text="currentUser" />
  </div>
</template>

<script setup lang="ts">
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';
  const locator = injectStrict(LocatorKey);
  const currentUser = locator.getStateService().getStateItem('currentUser');
</script>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
