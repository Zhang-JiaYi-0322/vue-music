<template>
  <div class="searchContainer">
    <div class="history">
      <div class="bar">
        <span>搜索历史</span>
        <a
          href="#"
          class="el-icon-delete delete"
          @click.prevent="clearHistory"
        ></a>
        <a href="#" class="showAll" @click.prevent="showAllHistory">查看全部</a>
      </div>
      <div class="historyBox" :style="showAll ? { height: 'auto' } : {}">
        <span class="noHistory" v-if="history.length == 0">暂无历史记录</span>
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
    <div class="hot">
      <h6>热搜榜</h6>
      <span class="error" v-if="error">加载失败</span>
      <ul>
        <li v-for="(item, index) in hots" :key="index">
          <span class="index" :style="{ color: index < 3 ? 'red' : 'gray' }">{{
            index + 1
          }}</span>
          <div class="content">
            <div class="row">
              <strong class="title">{{ item.searchWord }}</strong>
              <img v-if="item.iconUrl" :src="item.iconUrl" alt="" />
              <span class="dgree">{{ item.score }}</span>
            </div>
            <span class="info">{{ item.content }}</span>
          </div>
        </li>
      </ul>
    </div>
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
        "love live",
        "love live",
        "love live",
        "love live",
      ],
      hots: [],
      showAll: false,
      error: false,
    };
  },
  created() {
    window.$axios
      .get("/search/hot/detail")
      .then((response) => {
        if (response.status == 200) {
          this.hots = response.data.data;
        } else {
          this.error = true;
        }
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    clearHistory() {
      this.history = [];
    },
    showAllHistory() {
      this.showAll = true;
    },
  },
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
  overflow: auto;

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
      .noHistory {
        display: block;
        height: 100%;
        font-size: 12px;
        font-style: italic;
        margin: 0 0;
        text-align: center;
      }
    }
  }

  .hot {
    line-height: 1;
    h6 {
      text-decoration: none;
      font-weight: 400;
      color: #666;
      font-size: 14px;
      margin: 15px 0;
    }

    .error {
      display: block;
      height: 100%;
      font-size: 12px;
      font-style: italic;
      margin: 0 0;
      text-align: center;
    }

    ul {
      padding: 0;
      list-style: none;

      li {
        height: 50px;
        display: flex;
        margin-bottom: 10px;

        .index {
          width: 40px;
          line-height: 50px;
        }
        .content {
          display: flex;
          flex-direction: column;
          flex: 1;
          font-size: 12px;

          .row {
            flex: 1;
            line-height: 25px;
            .title {
              margin-right: 5px;
            }
            img {
              padding-top: 10px;
              height: 12px;
            }
            .dgree {
              display: inline-block;
              color: gray;
              transform: translateY(1px) scale(0.9);
            }
          }
          .info {
            flex: 1;
            line-height: 25px;
            color: gray;
          }
        }
      }
    }
  }
}
</style> 