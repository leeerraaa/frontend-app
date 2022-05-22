<template>
  <div class="login">
    <div class="login__title">Вхід</div>

    <div class="login__content">
      <div class="login__content-row">
        <div class="login__content-label">Логін</div>
        <div class="login__content-field">
          <input v-model="login" type="text" class="input" />
        </div>
      </div>

      <div class="login__content-row">
        <div class="login__content-label">Пароль</div>
        <div class="login__content-field">
          <input v-model="password" type="password" class="input" />
        </div>
      </div>
    </div>

    <div class="login__footer">
      <div class="login__footer-error" v-show="isError">
        Невірний логін або пароль
      </div>
      <button
        class="button"
        type="button"
        :disabled="!login || !password"
        @click="submitData"
      >
        Увійти
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { inject, nextTick } from '@vue/runtime-core';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const axios = inject('axios');

    const login = ref('');
    const password = ref('');
    const isError = ref(false);

    const submitData = async () => {
      try {
        isError.value = false;

        const { data } = await axios({
          method: 'post',
          url: '/auth/sign-in',
          data: {
            login: login.value,
            password: password.value,
          },
        });

        store.dispatch('auth/setUserToken', data);
        await store.dispatch('auth/setUserLogin').then(() => {
          nextTick(() => {
            router.push({
              name: 'content.history',
            });
          });
        });
      } catch (e) {
        console.log(e);
        isError.value = true;
      }
    };

    return {
      login,
      password,
      isError,
      submitData,
    };
  },
};
</script>

<style lang="scss"></style>
