<template>
  <div class="content-layout">
    <div class="content-layout__sidebar">
      <TheSidebar />
    </div>
    <div class="content-layout__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue';

export default {
  components: {
    TheSidebar,
  },

  setup() {
    return {};
  },
};
</script>

<style lang="scss">
.content-layout {
  height: 100%;
  width: 100%;
  background: #dbe0e1;

  &__sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }

  &__content {
    margin-left: 250px;
    box-sizing: border-box;
    padding: 54px 76px;
  }
}
</style>
