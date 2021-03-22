import loading from "../../loading.vue";

export default {
    data() {
        return {
            isTableAlive: true,
            error: false,
            onLoad: false,
            songs: [],
            title: "歌单",
            creator: "???",
            creatorIcon: require("../../../assets/logo.png"),
            canSave: true,
            saved: false,
            date: "2021-3-22",
            coverImg: require("../../../assets/logo.png"),
            inputKey: "搜索歌单音乐",
        }
    },
    methods: {
        getFavoriteSongs(list) {
            list.reduce((pre, id) => {
                return pre.then(() => {
                    return new Promise((resolve, reject) => {
                        window.$axios.get("/song/detail?ids=" + id)
                            .then(res => {
                                if (res.status == 200) {
                                    const data = res.data.songs[0];
                                    this.songs.push({
                                        id,
                                        img: data.al.picUrl,
                                        name: data.name,
                                        artist: this.formatArtist(data.ar),
                                        duration: this.formatDuration(data.dt),
                                        album: data.al.name
                                    });
                                    resolve();
                                }
                                else {
                                    reject();
                                }
                            })
                            .catch(() => {
                                this.error = true;
                            });
                    })
                });
            }, Promise.resolve())
                .then(() => {
                    this.onLoad = true;
                });
        },
        formatArtist(arr) {
            let artist = "";
            for (const item of arr) {
                if (artist.length > 0) artist += "/"
                artist += item.name;
            }
            return artist;
        },
        formatDuration(dr) {
            dr = dr / 1000 / 60;
            const mm = Math.floor(dr).toString().padStart(2, "0");
            const ss = Math.floor((dr - mm) * 60).toString().padStart(2, "0");
            return `${mm}:${ss}`;
        },
        formatIndex(index) {
            index = index.toString();
            if (index.length < 2) {
                index = "0" + index;
            }
            return index;
        },
        getSavedBtnStyle() {
            if (this.canSave) {
                return { color: "black" };
            }
            else {
                return { color: "#666" };
            }
        },
        getSavedBtnIcon() {
            if (this.$route.params.id == "favorite" || this.saved == false) {
                return "el-icon-folder-add";
            }
            else {
                return "el-icon-folder-checked";
            }
        },
        getSavedBtnWord() {
            if (this.$route.params.id == "favorite" || this.saved == false) {
                return "收藏";
            }
            else {
                return "已收藏";
            }
        },
        searchFocus() {
            this.inputKey = "";
        },
        searchBlur() {
            if (this.inputKey == "") {
                this.inputKey = "搜索歌单音乐";
            }
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
        unFavorite(info) {
            const musicId = info.row.id;
            let favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
            const index = favorite.indexOf(musicId);
            if (index >= 0) {
                favorite.splice(index, 1);
                for (let i = 0; i < this.songs.length; i++) {
                    if (this.songs[i].id == musicId) {
                        this.songs.splice(i, 1);
                        break;
                    }
                }
            }
            localStorage.setItem("favorite", JSON.stringify(favorite));
        },
    },
    components: { loading },
    created() {
        this.title = this.$route.params.name;
        if (this.$route.params.id == "favorite") {
            this.creator = "自己";
            this.canSave = false;
            this.getFavoriteSongs(JSON.parse(localStorage.getItem("favorite") || "[]"));
        }
        else {
            this.creator = ""; // todo
            this.canSave = true;
            this.saved = true;
        }
    },
}