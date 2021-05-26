<template lang="pug">
button.min-w-20(:class="buttonClasses" :disabled="loading" :type="submit ? 'submit' : 'button'")
  .flex.items-center.justify-center(v-if="loading")
    gg-spinner.text-sm.animate-spin
  span(v-text="text" v-else)
</template>

<script lang="ts" setup>
  import { computed, defineProps, toRefs } from 'vue';

  const props =
    defineProps<{
      text: string;
      primary?: boolean;
      loading?: boolean;
      submit?: boolean;
    }>();

  const buttonClasses = computed(() => ({
    'btn-primary': props.primary,
    'btn-loading': props.loading,
  }));
</script>
