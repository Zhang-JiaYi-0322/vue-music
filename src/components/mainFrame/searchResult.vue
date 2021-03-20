<template>
  <div class="searchResult">
    <h4>找到999首单曲</h4>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick() {
        console.log(123);
    },
  },
  created() {
    console.log(this.$route);
    // /cloudsearch?keywords= 海阔天空
  },
};
</script>

<style lang="less" scoped>
</style>