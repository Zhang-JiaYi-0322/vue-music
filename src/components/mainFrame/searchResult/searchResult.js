import loading from "../../loading.vue";

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
                    this.getAlbum();
                    break;
                case "fourth":
                    this.getPlayList();
                    break;
                default:
                    alert("search type wrong: " + this.activeName);
            }
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
                            item: response.data.result.playlists,
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
                if (artists.length != 0) artists += " / ";
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
        playlistCountFormatter(e) {
            return e.trackCount + "首";
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
                const obj = {
                    id: row.id,
                    name: row.name,
                    artist: this.artistFormatter(row),
                    duration: Math.floor(row.duration / 1000),
                    albumId: row.album.id,
                    album: row.album.name,
                    // imgUrl: song.img
                }
                window.addToList(obj);
            }
        },
        // 最佳匹配的歌手点击事件
        artistClick() {
            this.$router.push(`/artist/${this.song.artist.id}/${this.song.artist.name}`);
        },
        // 歌手列表的点击事件
        artistListClick(row) {
            this.$router.push(`/artist/${row.id}/${row.name}`);
        },
        albumClick(row) {
            this.$router.push(`/album/${row.id}/${row.name}`);
        },
        playListClick(row) {
            this.$router.push(`/playList/${row.id}/${row.name}`);
        }
    },
    computed: {},
    components: { loading },
    created() {
        this.keyWord = this.$route.params.info;
        this.getSong();
    },
    beforeUpdate() {
        if (this.keyWord != this.$route.params.info) {
            this.keyWord = this.$route.params.info;
            this.error = false;
            this.onLoad = false;
            this.activeName = "first";
            this.getSong();
        }
    },
};