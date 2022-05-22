<template>
  <div class="sidebar">
    <div class="sidebar__name" v-if="userInfo">
      {{ userInfo.username }}
    </div>

    <div class="sidebar__content">
      <router-link :to="{ name: 'content.history' }" class="sidebar__link">
        Доступні Силабуси
      </router-link>

      <router-link :to="{ name: 'content.form' }" class="sidebar__link">
        Створити Силабус
      </router-link>

      <div class="sidebar__link" @click="logout">Вихід</div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfo = computed(() => store.getters['auth/getUserInfo']);

    const logout = () => {
      store.dispatch('auth/setUserUnlogin');

      nextTick(() => {
        router.push({
          name: 'service.login',
        });
      });
    };

    return {
      userInfo,
      logout,
    };
  },
};
</script>

<style lang="scss"></style>
