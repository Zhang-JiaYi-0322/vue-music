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
        <!-- song -->
        <el-tab-pane v-if="onLoad" class="song" label="单曲" name="first">
          <div class="artist" v-if="index == 0" @click="artistClick">
            <h5 class="match">最佳匹配</h5>
            <a href="#" @click.prevent="searchArtist">
              <img :src="song.artist.img1v1Url" alt="" srcset="" />
              <span>歌手：{{ song.artist.name }}</span>
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
        <!-- artist -->
        <el-tab-pane v-if="onLoad" class="artist" label="歌手" name="second">
          <el-table
            class="table"
            :data="artist.item"
            stripe
            style="width: 100%"
            :show-header="false"
            :row-style="{ height: '80px', overflow: 'hidden' }"
            cell-class-name="cell"
            @row-click="artistListClick"
          >
            <el-table-column class-name="column" prop="default" label="">
              <template #default="scope">
                <img class="pic" :src="scope.row.img1v1Url" alt="" />
                <span class="name">{{ scope.row.name }}</span>
                <i class="icon el-icon-user"> </i>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :small="true"
            :total="count"
            :page-size="20"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <!-- album -->
        <el-tab-pane v-if="onLoad" class="album" label="专辑" name="third"
          >专辑</el-tab-pane
        >
        <!-- playList -->
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
      keyWord: "",
      error: false,
      onLoad: false,
      activeName: "first",
      song: { more: false, item: [], count: 0, artist: null }, // 单曲
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
      switch (this.activeName) {
        case "first":
          this.getSong();
          break;
        case "second":
          this.getArtist();
          break;
        case "third":
          this.getArtist();
          break;
        case "fourth":
          this.getAlbum();
          break;
        default:
          alert("search type wrong: " + this.activeName);
      }
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
            this.song.artist = this.song.item[0].artists[0];
            this.onLoad = true;
            if (this.index == 0) this.getMatchedArtist();
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          // console.log(e);
          this.error = true;
        });
    },
    getMatchedArtist() {
      // 获取最佳匹配歌手的照片
      window.$axios.get(`/artists?id=` + this.song.artist.id).then((res) => {
        if (res.status == 200) {
          this.song.artist.img1v1Url = res.data.artist.img1v1Url;
        }
      });
    },
    getArtist(offset = 0) {
      window.$axios
        .get(
          `/search?type=100&offset=${offset}&limit=20&keywords=` +
            this.$route.params.info
        )
        .then((response) => {
          if (response.status == 200) {
            this.artist = {
              count: response.data.result.artistCount,
              more: response.data.result.hasMore,
              item: response.data.result.artists,
            };
            this.count = this.artist.count;
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
    getAlbum(offset = 0) {
      window.$axios
        .get(
          `/search?type=10&offset=${offset}&limit=20&keywords=` +
            this.$route.params.info
        )
        .then((response) => {
          if (response.status == 200) {
            this.album = {
              count: response.data.result.albumCount,
              item: response.data.result.albums,
            };
            console.log(response.data.result.albums);
            this.count = this.album.count;
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
    getPlayList(offset = 0) {
      window.$axios
        .get(
          `/search?type=1000&offset=${offset}&limit=20&keywords=` +
            this.$route.params.info
        )
        .then((response) => {
          if (response.status == 200) {
            this.playList = {
              count: response.data.result.playlistCount,
              more: response.data.result.hasMore,
              item: response.data.result.playLists,
            };
            this.count = this.playList.count;
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
      switch (this.activeName) {
        case "first":
          this.getSong(e - 1);
          break;
        case "second":
          this.getArtist(e - 1);
          break;
        case "third":
          this.getAlbum(e - 1);
          break;
        case "fourth":
          this.getPlayList(e - 1);
          break;
      }
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
    // 最佳匹配的歌手点击事件
    artistClick() {
      console.log("artist click");
    },
    // 歌手列表的点击事件
    artistListClick(row) {
      console.log(row);
    },
  },
  components: { loading },
  created() {
    this.keyWord = this.$route.params.info;
    this.getSong();
  },
  beforeUpdate() {
    if (this.keyWord != this.$route.params.info) {
      this.keyWord = this.$route.params.info;
      this.activeName = "first";
      this.getSong();
    }
  },
};
</script>

<style lang="less" scoped>
.page {
  text-align: center;
  margin: 40px auto;
}
.searchResult {
  height: 100%;
  overflow-x: hidden;
  //   overflow-y: scroll;
  h4 {
    padding-left: 30px;
  }
  .tab {
    margin: 0 auto;
    .song {
      margin-top: 20px;
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
    }
    .artist {
      .table {
        margin: 0 auto;
        vertical-align: middle;
        .cell {
          height: 60px;
          vertical-align: middle;
        }
        .column {
          padding: 0;
          .pic {
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
            height: 60px;
            width: 60px;
            border-radius: 5px;
          }
          .name {
            display: inline-block;
            margin-left: 15px;
            height: 60px;
            line-height: 60px;
          }
          .icon {
            float: right;
            margin-top: 17px;
            margin-right: 20px;
            text-align: center;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: rgb(242, 242, 242);
            background-color: rgb(243, 72, 66);
            border-radius: 50%;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>