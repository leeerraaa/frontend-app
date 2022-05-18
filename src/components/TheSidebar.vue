<template>
  <div class="sidebar">
    <div class="sidebar__name">П. І. П.</div>

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
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      router.push({
        name: 'service.login',
      });
    };

    return {
      logout,
    };
  },
};
</script>

<style lang="scss"></style>
