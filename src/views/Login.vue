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

export default {
  setup() {
    const router = useRouter();
    const login = ref('');
    const password = ref('');

    const submitData = () => {
      if (login.value && password.value) {
        router.push({
          name: 'content.history',
        });
      }
    };

    return {
      login,
      password,
      submitData,
    };
  },
};
</script>

<style lang="scss"></style>
