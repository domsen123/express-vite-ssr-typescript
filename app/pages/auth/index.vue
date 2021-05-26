<template lang="pug">
.flex.flex-1.p-5.justify-center.items-center
  div(class="bg-white w-full p-5 shadow-md md:w-1/4 md:min-w-120")
    .header-2 Application SignIn
    form(@submit.prevent="onSignInFormSubmit")
      .form-group
        label.form-label Username
        input.form-control(type="text" placeholder="root" v-model="form.username")
      .form-group
        label.form-label Password
        input.form-control(type="password" placeholder="pass4word" v-model="form.password")
      .submit-group
        AppButton(text="Cancel" @click="onSignInFormCancel")
        AppButton(text="Login" :loading="formIsLoading" primary submit)
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { LocatorKey } from '~/symbols';
  import { injectStrict } from '~/utils';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const locator = injectStrict(LocatorKey);

  const formIsLoading = ref<boolean>(false);

  const form = reactive({
    username: 'root',
    password: 'pass4word',
  });

  const onSignInFormSubmit = async () => {
    try {
      formIsLoading.value = true;
      await locator.getAuthService().signIn(form);
      await router.push('/');
    } catch (error) {
      formIsLoading.value = false;
    }
  };
  const onSignInFormCancel = () => {
    form.username = '';
    form.password = '';
  };
</script>

<route lang="yaml">
meta:
  layout: blank
</route>
