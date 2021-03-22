import loading from "../../loading.vue";

export default {
    data() {
        return {
            isTableAlive: true,
            error: false,
            onLoad: false,
            songs: [],
            songsLib: [],
            title: "歌单",
            creator: "???",
            creatorIcon: require("../../../assets/logo.png"),
            canSave: true,
            saved: false,
            date: "2021-3-22",
            coverImg: require("../../../assets/AppLogo.png"),
            inputKey: "搜索歌单音乐",
        }
    },
    methods: {
        getSongs(list) {
            // 顺序请求歌曲信息，当歌单列表较长时延迟明显
            // list.reduce((pre, id) => {
            //     return pre.then(() => {
            //         return new Promise((resolve, reject) => {
            //             window.$axios.get("/song/detail?ids=" + id)
            //                 .then(res => {
            //                     if (res.status == 200) {
            //                         const data = res.data.songs[0];
            //                         this.songsLib.push({
            //                             id,
            //                             img: data.al.picUrl,
            //                             name: data.name,
            //                             artist: this.formatArtist(data.ar),
            //                             duration: this.formatDuration(data.dt),
            //                             album: data.al.name
            //                         });
            //                         resolve();
            //                     }
            //                     else {
            //                         reject();
            //                     }
            //                 })
            //                 .catch(() => {
            //                     this.error = true;
            //                 });
            //         })
            //     });
            // }, Promise.resolve())
            //     .then(() => {
            //         this.songs = this.songsLib;
            //         this.onLoad = true;
            //     });
            const self = this;
            window.$axios
                .all(list.map(id => window.$axios.get("/song/detail?ids=" + id)))
                .then(window.$axios.spread(function () {
                    for (const res of arguments) {
                        if (res.status == 200) {
                            const data = res.data.songs[0];
                            self.songsLib.push({
                                id: data.id,
                                img: data.al.picUrl,
                                name: data.name,
                                artist: self.formatArtist(data.ar),
                                duration: self.formatDuration(data.dt),
                                album: data.al.name
                            });
                        }
                        else {
                            self.error = true;
                            break;
                        }
                    }
                    self.songs = self.songsLib;
                    self.onLoad = true;
                }))
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
            index = (++index).toString();
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
        search() {
            this.songs = [];
            this.songsLib.map(song => {
                const index1 = song.name.indexOf(this.inputKey);
                const index2 = song.artist.indexOf(this.inputKey);
                const index3 = song.album.indexOf(this.inputKey);
                if (index1 > -1 || index2 > -1 || index3 > -1) {
                    this.songs.push(song);
                }
            });
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
        songClick(row, column, cell, event) {
            if (event.path[0].nodeName != "I") {
                console.log(row, column);
            }
        },
        savePlayList() {
            let storage = JSON.parse(localStorage.getItem("savedPlayList") || "[]");
            if (!this.saved) {
                storage.push({ id: this.$route.params.id, label: this.title });
                this.saved = true;
            }
            else {
                for (let i = 0; i < storage.length; i++) {
                    if (storage[i].id == this.$route.params.id) {
                        storage.splice(i, 1);
                        localStorage.setItem("savedPlayList", JSON.stringify(storage));
                        this.saved = false;
                        break;
                    }
                }
            }
        },
        getDate(time) {
            const yyyy = time.getFullYear();
            const mm = (time.getMonth() + 1).toString().padStart(2, "0");
            const dd = time.getDay().toString().padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        },
    },
    components: { loading },
    created() {
        const id = this.$route.params.id;
        this.title = this.$route.params.name;
        if (id == "favorite") {
            this.creator = "自己";
            this.canSave = false;
            this.getSongs(JSON.parse(localStorage.getItem("favorite") || "[]"));
        }
        else {
            this.canSave = true;
            const storage = JSON.parse(localStorage.getItem("savedPlayList") || "[]");
            if (storage.includes(id)) {
                this.saved = true;
            }
            else {
                this.saved = false;
            }
            window.$axios
                .get("/playlist/detail?id=" + id)
                .then(res => {
                    if (res.status == 200) {
                        const data = res.data.playlist;
                        this.coverImg = data.coverImgUrl;
                        this.creator = data.creator.nickname;
                        this.creatorIcon = data.creator.avatarUrl;
                        this.date = this.getDate(new Date(data.createTime));
                        this.getSongs(data.trackIds.map(item => item.id));
                    }
                    else {
                        this.error = true;
                    }
                })
                .catch(() => {
                    this.error = true;
                })
            this.creator = ""; // todo
        }
    },
}