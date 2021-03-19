<template>
  <div class="searchContainer">
    <div class="history">
      <div class="bar">
        <span>搜索历史</span>
        <a href="#" class="el-icon-delete delete"></a>
        <a href="#" class="showAll">查看全部</a>
      </div>
      <div class="historyBox">
        <el-button
          class="historyBtn"
          round
          size="mini"
          v-for="(item, index) in history"
          :key="index"
          >{{ item }}</el-button
        >
      </div>
    </div>
    <div class="hot"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [
        "周杰伦",
        "ささやかな祈り",
        "今井麻美",
        "加勒比海盗",
        "love live",
      ],
      hot: [],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: #666;
}

.searchContainer {
  box-sizing: border-box;
  width: 350px;
  height: 447px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  //   border: 1px solid #666;
  box-shadow: 0px 0px 10px rgb(179, 179, 179);
  padding: 0px 20px;

  .history {
    .bar {
      height: 50px;
      overflow: hidden;
      span {
        float: left;
        color: #666;
        font-size: 14px;
        margin-right: 5px;
      }
      .delete {
        transform: scale(0.9, 0.9);
      }
      .showAll {
        float: right;
        font-size: 12px;
      }
      &::after {
        content: "";
        width: 0;
        height: 0;
        clear: both;
      }
    }

    .historyBox {
      margin-top: -5px;
      width: 100%;
      height: 80px;
      line-height: 38px;
      overflow: hidden;
      .historyBtn {
        margin: 0 8px 0 0;
      }
    }
  }
}
</style> 