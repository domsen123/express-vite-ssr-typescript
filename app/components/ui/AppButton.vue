<template lang="pug">
button(:class="buttonClasses" :disabled="loading" :type="submit ? 'submit' : 'button'")
  .flex.items-center.justify-center(v-if="loading")
    gg-spinner.text-sm.animate-spin
  .flex.items-center.justify-center(v-else)
    span(v-text="text ?? ''" v-if="!$slots.default")
    slot
</template>

<script lang="ts" setup>
  import { computed, defineProps } from 'vue';

  const props =
    defineProps<{
      text?: string;
      primary?: boolean;
      loading?: boolean;
      submit?: boolean;
      icon?: boolean;
      round?: boolean;
      link?: boolean;
      dark?: boolean;
    }>();

  const buttonClasses = computed(() => ({
    'btn-primary': props.primary,
    'btn-loading': props.loading,
    'btn-icon': props.icon,
    'btn-round': props.round,
    'btn-link': props.link,
    'btn-dark': props.dark,
  }));
</script>
