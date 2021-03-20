<template>
  <div class="pageContainer">
    <!-- 顶部 -->
    <header>
      <!-- logo -->
      <div class="logo">
        <img src="./assets/AppLogo.png" alt="logo" />
        <span>叽歪音乐</span>
      </div>
      <!-- 搜索框 -->
      <search class="search"></search>
    </header>
    <!-- 内容部分 -->
    <div class="container">
      <nav>nav</nav>
      <article>
        <router-view></router-view>
      </article>
    </div>
    <!-- 底部播放器 -->
    <footer>footer</footer>
  </div>
</template>

<script>
import search from "./components/searchBar.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {
    search,
  },
};
</script>

<style lang="less" scoped>
.pageContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;

  header {
    position: relative;
    height: 58px;
    line-height: 58px;
    background-color: rgb(236, 65, 65);
    padding-left: 20px;

    .logo {
      height: 58px;
      line-height: 58px;

      img {
        height: 40%;
        vertical-align: middle;
        margin-right: 5px;
        transform: translateY(-3px);
      }

      span {
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        color: #fff;
      }
    }

    .search {
      z-index: 999;
    }
  }

  .container {
    flex: 1;
    display: flex;
    background-color: rgb(255, 255, 255);
    overflow: hidden;

    nav {
      width: 200px;
      height: 100%;
      border-right: 1px solid #666;
    }

    article {
      flex: 1;
      height: 100%;
      // overflow: hidden;
    }
  }

  footer {
    height: 70px;
    background-color: rgb(246, 246, 248);
    border-top: 1px solid #666;
  }
}
</style>

