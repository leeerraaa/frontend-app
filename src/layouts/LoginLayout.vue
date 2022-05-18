<template>
  <div class="login-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
.login-layout {
  height: 100%;
  width: 100%;
  background: #dbe0e1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
