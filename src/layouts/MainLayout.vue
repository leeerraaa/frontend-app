<template>
  <div class="main-layout">
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

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
