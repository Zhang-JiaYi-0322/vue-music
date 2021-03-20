<template>
  <div class="searchResult">
    <h4>找到999首单曲</h4>
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <loading
        v-if="!error && !onLoad"
        text="拼命加载中"
        icon="el-icon-loading"
      ></loading>
      <loading v-if="error" text="加载失败" icon="el-icon-close"></loading>
      <el-tab-pane v-if="onLoad" class="song" label="单曲" name="first">
        <div class="artist">
          <h5 class="match">最佳匹配</h5>
          <a href="#" @click.prevent="searchArtist">
            <img :src="song.artist.img1v1Url" alt="" srcset="" />
            <span>歌手：{{ song.artist.name }}</span>
            <i class="el-icon-arrow-right"> </i>
          </a>
        </div>
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
      song: { more: false, item: [], count: 0, artist: null }, // 单曲
      artist: { more: false, item: [], count: 0 }, // 歌手
      album: { more: false, item: [] }, // 专辑
      playList: { more: false, item: [], count: 0 }, //歌单
      loading: true,
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
                this.onLoad = true;
                break;
              case "third":
                this.album = {
                  count: response.data.result.albumCount,
                  item: response.data.result.albums,
                };
                this.onLoad = true;
                break;
              case "fourth":
                this.artist = {
                  count: response.data.result.playListCount,
                  more: response.data.result.hasMore,
                  item: response.data.result.playLists,
                };
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
    getSong() {
      window.$axios
        .get(`/search?type=1&limit=100&keywords=` + this.$route.params.info)
        .then((response) => {
          if (response.status == 200) {
            this.song = {
              count: response.data.result.songCount,
              more: response.data.result.hasMore,
              item: response.data.result.songs,
            };
            window.$axios
              .get(
                `/search?type=100&limit=1&keywords=` + this.$route.params.info
              )
              .then((response) => {
                if (response.status == 200) {
                  this.song.artist = response.data.result.artists[0];
                  this.onLoad = true;
                } else {
                  this.error = true;
                }
              })
              .catch(() => {
                this.error = true;
              });
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          // console.log(e);
          this.error = true;
        });
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
    }
  }
}
</style>