<template>
  <div
    class="loading"
    v-loading="true"
    :element-loading-text="text"
    :element-loading-spinner="icon"
    element-loading-background="rgba(255, 255, 255, 0)"
  >
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["text", "icon"],
};
</script>

<style lang="less" scoped>
.loading {
  height: 80px;
  background-color: transparent;
}
</style>