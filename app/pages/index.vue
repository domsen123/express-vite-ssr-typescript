<template>
  <div>
    <h1>Index Page</h1>
    <router-link to="/">Page1</router-link>
    <router-link to="/page2">Page2</router-link>
    <div @click="testAxios">make call</div>
  </div>
</template>

<script setup lang="ts">
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';
  const locator = injectStrict(LocatorKey);

  const testAxios = async () => {
    const { data, headers, request, config } = await locator.axios.get(
      '/test_session'
    );
    console.log(data);
  };

  testAxios()
    .then()
    .catch((error) => console.log(error));
</script>
