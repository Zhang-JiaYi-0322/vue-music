<template>
  <div class="search">
    <input
      type="text"
      @focus="getFocus"
      @blur="loseFocus"
      @keyup.enter="search"
      v-model="searchKey"
      ref="input"
    />
    <i class="el-icon-search"></i>
    <div
      class="searchContainer"
      v-if="searchFocus"
      @mouseenter="onContent = true"
      @mouseleave="onContent = false"
    >
      <el-scrollbar class="scrollBar" style="height: 100%">
        <div class="history">
          <div class="bar">
            <span>搜索历史</span>
            <a
              href="#"
              class="el-icon-delete delete"
              @click.prevent="clearHistory"
            ></a>
            <a href="#" class="showAll" @click.prevent="showAllHistory"
              >查看全部</a
            >
          </div>
          <div
            class="historyBox"
            :style="showAll ? { height: 'auto', 'max-height': '999px' } : {}"
          >
            <span class="noHistory" v-if="history.length == 0"
              >暂无历史记录</span
            >
            <el-button
              class="historyBtn"
              round
              size="mini"
              v-for="(item, index) in history"
              :key="index"
              @click="route(item)"
              >{{ item }}</el-button
            >
          </div>
        </div>
        <div class="hot">
          <h6>热搜榜</h6>
          <span class="error" v-if="error">加载失败</span>
          <ul>
            <li
              v-for="(item, index) in hots"
              :key="index"
              @click="search(item.searchWord)"
            >
              <!-- <router-link
                class="link"
                :to="'/searchResult/' + item.searchWord"
                @click="hideSelf"
              ></router-link> -->
              <span
                class="index"
                :style="{ color: index < 3 ? 'red' : 'gray' }"
                >{{ index + 1 }}</span
              >
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
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchFocus: false,
      // searchFocus: true,
      searchKey: "搜索",
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
      onContent: false,
    };
  },
  created() {},
  methods: {
    getFocus() {
      this.getInfo();
      this.searchFocus = true;
      this.searchKey = "";
    },
    loseFocus(e) {
      console.log(e);
      if (!this.onContent) {
        // this.$router.push("/searchResult/" + this.searchKey);
        this.searchFocus = false;
      }
    },
    search(key = undefined) {
      const info = key ? key : this.searchKey;
      let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      history.unshift(info);
      if (history.length > 20) history.length = 20;
      localStorage.setItem("searchHistory", JSON.stringify(history));
      this.getHistory();

      this.route(info);
    },
    getHistory() {
      this.history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    },
    clearHistory() {
      this.history = [];
      localStorage.setItem("searchHistory", "[]");
      this.$refs.input.focus();
    },
    showAllHistory() {
      this.showAll = true;
      this.$refs.input.focus();
    },
    getInfo() {
      // 获取热搜榜
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
          // console.log(e);
          this.error = true;
        });

      // 获取历史记录
      this.getHistory();
    },
    // hideSelf(key) {
    //   this.searchKey = key;
    //   this.searchFocus = false;
    // },
    route(key) {
      this.$router.push("/searchResult/" + key);
      this.searchKey = key;
      this.searchFocus = false;
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: #666;
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

  .searchContainer {
    position: absolute;
    top: 50px;
    box-sizing: border-box;
    width: 350px;
    height: 447px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    //   border: 1px solid #666;
    box-shadow: 0px 0px 10px rgb(179, 179, 179);
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
        max-height: 80px;
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
          position: relative;
          height: 60px;
          display: flex;
          // margin-bottom: 10px;
          &:hover {
            background-color: rgb(242, 242, 242);
          }
          .link {
            position: absolute;
            display: block;
            width: 100%;
            height: 60px;
            top: 0px;
            left: 0px;
          }
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

    .scrollBar {
      padding: 0px 20px;
    }
  }
}
</style> 