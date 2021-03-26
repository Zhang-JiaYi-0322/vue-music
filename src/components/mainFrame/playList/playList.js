import loading from "../../loading.vue";
const creatorIcon = require("../../../assets/logo.png");
const coverImg = require("../../../assets/AppLogo.png");

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
            creatorIcon: creatorIcon,
            canSave: true,
            saved: false,
            date: "2021-3-22",
            coverImg: coverImg,
            inputKey: "搜索歌单音乐",
            favoriteList: false,
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
                                album: data.al.name,
                                albumId: data.al.id,
                                totalTime: data.dt
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
                if (artist.length > 0) artist += " / "
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
        favorite(info) {
            const musicId = info.row.id;
            let favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
            const index = favorite.indexOf(musicId);
            const el = document.getElementById(musicId);
            if (index >= 0) {
                favorite.splice(index, 1);
                if (this.favoriteList) {
                    for (let i = 0; i < this.songs.length; i++) {
                        if (this.songs[i].id == musicId) {
                            this.songs.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    el.className = el.className.replace(
                        "el-icon-star-on",
                        "el-icon-star-off"
                    );
                    el.style.color = "gray";
                }
            }
            if (index < 0 && !this.favoriteList) {
                favorite.unshift(musicId);
                el.className = el.className.replace(
                    "el-icon-star-off",
                    "el-icon-star-on"
                );
                el.style.color = "red";
            }
            localStorage.setItem("favorite", JSON.stringify(favorite));
        },
        songClick(row, column, cell, event) {
            if (event.path[0].nodeName != "I") {
                const obj = {
                    id: row.id,
                    name: row.name,
                    artist: row.artist,
                    duration: Math.floor(row.totalTime / 1000),
                    albumId: row.albumId,
                    album: row.album,
                    imgUrl: row.img
                }
                window.addToList(obj);
            }
        },
        savePlayList() {
            let storage = JSON.parse(localStorage.getItem("savedPlayList") || "[]");
            const id = this.$route.params.id;
            const res = this.checkSavedList(storage, id);
            if (res.found) {
                storage.splice(res.index, 1);
                this.saved = false;
            }
            else {
                storage.push({ id, label: this.$route.params.name });
                this.saved = true;
            }
            localStorage.setItem("savedPlayList", JSON.stringify(storage));
            this.$emit("reloadList");
        },
        getDate(time) {
            const yyyy = time.getFullYear();
            const mm = (time.getMonth() + 1).toString().padStart(2, "0");
            const dd = time.getDate().toString().padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        },
        checkSavedList(storage, id) {
            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id == id) {
                    return { index: i, found: true };
                }
            }
            return { index: -1, found: false };
        },
        init(id, name) {
            id = id ? id : this.$route.params.id;
            name = name ? name : this.$route.params.name;
            this.title = name;
            if (id == "favorite") {
                this.creator = "自己";
                this.canSave = false;
                this.favoriteList = true;
                this.getSongs(JSON.parse(localStorage.getItem("favorite") || "[]"));
            }
            else {
                this.canSave = true;
                const storage = JSON.parse(localStorage.getItem("savedPlayList") || "[]");
                const res = this.checkSavedList(storage, id);
                if (res.found) {
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
            }
        },
        reload() {
            this.isTableAlive = false;
            this.$nextTick(function () {
                this.isTableAlive = true;
            });
        },
        playAll() {
            for (let i = this.songsLib.length - 1; i >= 0; i--) {
                const song = this.songsLib[i];
                window.addToList({
                    id: song.id,
                    name: song.name,
                    artist: song.artist,
                    duration: Math.floor(song.totalTime / 1000),
                    albumId: song.albumId,
                    album: song.album,
                    imgUrl: song.img
                });
            }
        }
    },
    components: { loading },
    created() {
        this.init();
    },
    beforeRouteUpdate(to, from, next) {
        this.error = false;
        this.onLoad = false;
        this.songs = [];
        this.songsLib = [];
        this.title = "歌单"
        this.date = "2021-3-22";
        this.creator = "???";
        this.creatorIcon = creatorIcon;
        this.coverImg = coverImg;
        this.inputKey = "搜索歌单音乐";
        this.favoriteList = false;
        this.init(to.params.id, to.params.name);
        next();
    }
}