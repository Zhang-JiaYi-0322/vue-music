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
      <div class="search">
        <input type="text" value="搜索" @focus="getFocus" @blur="loseFocus" />
        <i class="el-icon-search"></i>
        <search-info class="searchInfo" v-if="searchFocus"></search-info>
      </div>
    </header>
    <!-- 内容部分 -->
    <div class="container">
      <nav>nav</nav>
      <article>article</article>
    </div>
    <!-- 底部播放器 -->
    <footer>footer</footer>
  </div>
</template>

<script>
import searchInfo from "./components/searchInfo.vue";

export default {
  name: "App",
  data() {
    return {
      // searchFocus: false,
      searchFocus: true,
    };
  },
  methods: {
    getFocus() {
      this.searchFocus = true;
    },
    loseFocus() {
      // this.searchFocus = false;
    },
  },
  components: {
    searchInfo,
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
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);

      input {
        width: 20vw;
        height: 24px;
        border-radius: 12px;
        background-color: rgb(225, 62, 62);
        color: rgb(249, 216, 216);
        border: 0;
        outline: none;
        padding-left: 33px;
        padding-right: 10px;
      }

      i {
        position: absolute;
        top: 22px;
        left: 10px;
        width: 7px;
        height: 7px;
        color: rgb(249, 216, 216);
      }

      .searchInfo {
        position: absolute;
        top: 50px;
      }
    }
  }

  .container {
    flex: 1;
    display: flex;
    background-color: rgb(255, 255, 255);

    nav {
      width: 200px;
      height: 100%;
      border-right: 1px solid #666;
    }

    article {
      flex: 1;
      height: 100%;
    }
  }

  footer {
    height: 70px;
    background-color: rgb(246, 246, 248);
    border-top: 1px solid #666;
  }
}
</style>

