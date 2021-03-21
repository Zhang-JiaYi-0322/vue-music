<template>
  <div class="searchResult">
    <el-scrollbar class="scrollBar" style="height: 100%">
      <h4 v-if="onLoad">找到{{ count || 0 }}个结果</h4>
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <loading
          v-if="!error && !onLoad"
          text="拼命加载中"
          icon="el-icon-loading"
        ></loading>
        <loading v-if="error" text="加载失败" icon="el-icon-close"></loading>
        <el-tab-pane v-if="onLoad" class="song" label="单曲" name="first">
          <div class="artist" v-if="index == 0" @click="artistClick">
            <h5 class="match">最佳匹配</h5>
            <a href="#" @click.prevent="searchArtist">
              <img :src="song.item[0].artists[0].img1v1Url" alt="" srcset="" />
              <span>歌手：{{ song.item[0].artists[0].name }}</span>
              <i class="el-icon-arrow-right"> </i>
            </a>
          </div>
          <div class="songList" v-if="isTableAlive">
            <el-table
              :data="song.item"
              class="table"
              stripe
              style="width: 100%"
              @cell-click="songClick"
            >
              <!-- 占位 -->
              <el-table-column prop="" label="" width="20"></el-table-column>
              <!-- index -->
              <el-table-column
                prop=""
                label=""
                width="50"
                type="index"
                :index="indexMethod"
              ></el-table-column>
              <!-- favorite -->
              <el-table-column prop="" label="" width="70">
                <template #default="scope">
                  <i
                    :id="scope.row.id"
                    :class="checkFavorite(scope) + ' ' + `favorite`"
                    :style="{ color: checkFavorite(scope, true) }"
                    @click="favorite(scope)"
                  ></i>
                </template>
              </el-table-column>
              <!-- 音乐标题 -->
              <el-table-column prop="name" label="音乐标题" width="">
              </el-table-column>
              <!-- 歌手 -->
              <el-table-column
                prop=""
                label="歌手"
                width=""
                :formatter="artistFormatter"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <!-- 专辑 -->
              <el-table-column
                prop=""
                label="专辑"
                width=""
                :formatter="albumFormatter"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <!-- 时长 -->
              <el-table-column
                prop="duration"
                label="时长"
                width="80"
                :formatter="timeFormatter"
              >
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :small="true"
            :total="count"
            :page-size="100"
            @current-change="changePage"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane v-if="onLoad" class="artist" label="歌手" name="second"
          >歌手</el-tab-pane
        >
        <el-tab-pane v-if="onLoad" class="album" label="专辑" name="third"
          >专辑</el-tab-pane
        >
        <el-tab-pane v-if="onLoad" class="playList" label="歌单" name="fourth"
          >歌单</el-tab-pane
        >
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script>
import loading from "../loading.vue";

export default {
  data() {
    return {
      error: false,
      onLoad: false,
      activeName: "first",
      song: { more: false, item: [], count: 0 }, // 单曲
      artist: { more: false, item: [], count: 0 }, // 歌手
      album: { more: false, item: [] }, // 专辑
      playList: { more: false, item: [], count: 0 }, //歌单
      loading: true,
      count: 0,
      index: 0,
      isTableAlive: true,
    };
  },
  methods: {
    handleClick() {
      this.error = false;
      this.onLoad = false;
      let type;
      let limit;
      switch (this.activeName) {
        case "first":
          type = 1;
          limit = 100;
          break;
        case "second":
          type = 100;
          limit = 20;
          break;
        case "third":
          type = 10;
          limit = 20;
          break;
        case "fourth":
          type = 1000;
          limit = 20;
          break;
        default:
          alert("search type wrong: " + this.activeName);
      }
      window.$axios
        .get(
          `/search?type=${type}&limit=${limit}&keywords=` +
            this.$route.params.info
        )
        .then((response) => {
          if (response.status == 200) {
            switch (this.activeName) {
              case "first":
                this.getSong();
                break;
              case "second":
                this.artist = {
                  count: response.data.result.artistCount,
                  more: response.data.result.hasMore,
                  item: response.data.result.artists,
                };
                this.count = this.artist.count;
                this.onLoad = true;
                break;
              case "third":
                this.album = {
                  count: response.data.result.albumCount,
                  item: response.data.result.albums,
                };
                this.count = this.album.count;
                this.onLoad = true;
                break;
              case "fourth":
                this.playList = {
                  count: response.data.result.playlistCount,
                  more: response.data.result.hasMore,
                  item: response.data.result.playLists,
                };
                this.count = this.playList.count;
                this.onLoad = true;
                break;
            }
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          // console.log(e);
          this.error = true;
        });
    },
    searchArtist() {
      console.log("searchArtist");
    },
    getSong(offset = 0) {
      window.$axios
        .get(
          `/search?type=1&limit=100&offset=${offset}&keywords=` +
            this.$route.params.info
        )
        .then((response) => {
          if (response.status == 200) {
            this.song = {
              count: response.data.result.songCount,
              more: response.data.result.hasMore,
              item: response.data.result.songs,
            };
            this.count = this.song.count;
            this.song.item.length = this.count - this.index * 100;
            this.onLoad = true;
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          // console.log(e);
          this.error = true;
        });
    },
    indexMethod(index) {
      index = ++index + this.index * 100;
      if (index.toString().length == 1) return "0" + index;
      else return index;
    },
    favorite(info) {
      const musicId = info.row.id;
      let favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
      const index = favorite.indexOf(musicId);
      const el = document.getElementById(musicId);
      if (index >= 0) {
        favorite.splice(index, 1);
        el.className = el.className.replace(
          "el-icon-star-on",
          "el-icon-star-off"
        );
        el.style.color = "gray";
      } else {
        favorite.unshift(musicId);
        el.className = el.className.replace(
          "el-icon-star-off",
          "el-icon-star-on"
        );
        el.style.color = "red";
      }
      localStorage.setItem("favorite", JSON.stringify(favorite));
    },
    checkFavorite(e, flag) {
      const id = e.row.id;
      let favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
      const index = favorite.indexOf(id);
      if (index >= 0) {
        return flag ? "red" : "el-icon-star-on";
      } else {
        return flag ? "gray" : "el-icon-star-off";
      }
    },
    artistFormatter(e) {
      let artists = "";
      for (const artist of e.artists) {
        if (artists.length != 0) artists += "/";
        artists += artist.name;
      }
      return artists;
    },
    albumFormatter(e) {
      return e.album.name;
    },
    timeFormatter(e) {
      let time = e.duration / 1000 / 60;
      let mm = Math.floor(time).toString().padStart(2, "0");
      let ss = Math.floor((time - Number(mm)) * 60)
        .toString()
        .padStart(2, "0");
      return mm + ":" + ss;
    },
    changePage(e) {
      this.index = e - 1;
      this.getSong(e - 1);
      this.reload();
    },
    reload() {
      this.isTableAlive = false;
      this.$nextTick(function () {
        this.isTableAlive = true;
      });
    },
    songClick(row, column, cell, event) {
      if (event.path[0].nodeName != "I") {
        console.log("song click");
      }
    },
    artistClick() {
      console.log("artist click");
    },
  },
  components: { loading },
  created() {
    this.getSong();
  },
};
</script>

<style lang="less" scoped>
.searchResult {
  height: 100%;
  overflow-x: hidden;
  //   overflow-y: scroll;
  h4 {
    padding-left: 30px;
  }
  .tab {
    .song {
      margin-top: -20px;
      .artist {
        margin-left: 30px;
        .match {
          margin-bottom: 10px;
        }
        a {
          display: flex;
          width: 364px;
          height: 80px;
          background-color: rgb(244, 244, 244);
          align-items: center;
          text-decoration: none;

          img {
            box-sizing: border-box;
            // width: 100%;
            height: 100%;
            border: 1px solid royalblue;
          }

          span {
            // display: inline-block;
            flex: 1;
            padding-left: 16px;
            height: 80px;
            line-height: 80px;
            color: black;
          }

          i {
            transform: scale(1.4);
            padding-right: 20px;
            color: rgb(154, 154, 154);
          }
        }
      }
      .table {
        margin-top: 20px;
        border-top: 1px solid rgb(242, 242, 242);
        .favorite {
          transform: scale(1.3);
        }
      }
      .page {
        text-align: center;
        margin: 40px auto;
      }
    }
  }
}
</style>