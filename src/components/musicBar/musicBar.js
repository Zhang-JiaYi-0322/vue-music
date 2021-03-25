const imgUrl = require("../../assets/AppLogo.png");


const vm = {
    data() {
        return {
            playList: [
                {
                    id: -1,
                    imgUrl,
                    url: "",
                    name: "暂无音乐",
                    artist: "none",
                    duration: -1,
                    time: "--:--",
                    favorite: false,
                    favoriteAble: false,
                }
            ],
            playListId: [],
            index: 0,
            playedTime: 0,
            // audio 绑定了 currentTime，如果使用 playedTime 会导致一帧播放两次
            currentTime: 0,
            lastTime: 0,
            duration: 240,
            playedTimeString: "00:00",
            durationString: "--:--",
            playing: false,
            playModeList: [
                "icon ion-shuffle btn",             // random
                "icon ion-arrow-return-right btn",  // circle
                "icon ion-navicon-round btn"        // order
            ],
            playMode: 0,
            sound: 20,
            url: "",
            count: 0,
            showPlayList: false
        }
    },
    methods: {
        formatTime() {
            if (this.playedTime == 0 || this.duration == 0) {
                this.playedTimeString = "00:00";
            }
            else {
                const time = this.playedTime / 60;
                const mm = Math.floor(time).toString().padStart(2, "0");
                const ss = Math.round((time - mm) * 60).toString().padStart(2, "0");
                this.playedTimeString = `${mm}:${ss}`;
            }
            if (this.duration == 0) {
                this.durationString = "--:--";
            }
            else {
                const time = this.duration / 60;
                const mm = Math.floor(time).toString().padStart(2, "0");
                const ss = Math.round((time - mm) * 60).toString().padStart(2, "0");
                this.durationString = `${mm}:${ss}`;
            }
        },
        timeChange(e) {
            this.playedTime = e;
            this.currentTime = e;
            this.formatTime();
        },
        checkFavorite(id) {
            const favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
            return favorite.indexOf(id) >= 0 ? true : false;
        },
        favorite() {
            const song = this.playList[this.index];
            if (song.favoriteAble !== false) {
                const musicId = song.id;
                let favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
                const index = favorite.indexOf(musicId);
                if (index >= 0) {
                    favorite.splice(index, 1);
                    song.favorite = false;
                } else {
                    favorite.unshift(musicId);
                    song.favorite = true;
                }
                localStorage.setItem("favorite", JSON.stringify(favorite));
            }
        },
        changePlayState() {
            // if (this.playList[this.index].id != -1) {
            if (this.playing) {
                this.$refs["audio"].pause();
            }
            else {
                this.$refs["audio"].play();
            }
            this.playing = !this.playing;
            // }
        },
        skipPlay(direction) {
            if (this.playList[0].id != -1) {
                if (direction == -1) {
                    switch (this.playMode) {
                        case 0:
                            this.index = Math.floor(Math.random() * this.playList.length);
                            break;
                        case 1:
                            this.index--;
                            if (this.index < 0) this.index = this.playList.length - 1;
                            break;
                        case 2:
                            this.index--;
                            if (this.index < 0) this.index = 0;
                            break;
                    }
                }
                else {
                    switch (this.playMode) {
                        case 0:
                            this.index = Math.floor(Math.random() * this.playList.length);
                            break;
                        case 1:
                            this.index++;
                            if (this.index >= this.playList.length) this.index = 0;
                            break;
                        case 2:
                            this.index++;
                            if (this.index >= this.playList.length) this.index = this.playList.length - 1;
                            break;
                    }
                }
                this.setMusic(this.index);
            }
        },
        changePlayMode() {
            this.playMode++;
            if (this.playMode >= 3) {
                this.playMode = 0;
            }
        },
        soundClick() {
            if (this.sound > 0) {
                this.sound = 0;
            }
            else {
                this.sound = 40;
            }
        },
        timeupdate(e) {
            const time = Math.round(e.target.currentTime);
            if (this.lastTime != time) {
                this.playedTime = time;
                this.lastTime = time;
                this.formatTime();
            }
        },
        isPlaying(id) {
            // return this.playList[this.index].id === id
            return this.playList[this.index].id === id && id !== -1;
        },
        clearPlayList() {
            this.playList = [
                {
                    id: -1,
                    imgUrl,
                    url: "",
                    name: "暂无音乐",
                    artist: "none",
                    duration: -1,
                    time: "--:--",
                    favorite: false,
                    favoriteAble: false,
                }
            ];
            this.playListId = [];
            this.index = 0;
            this.url = "";
            this.count = 0;
            this.playedTime = 0;
            this.duration = 0;
            this.formatTime();
        },
        addToList(obj) {
            const self = this;
            window.$axios.all([
                window.$axios.get(`/song/url?id=${obj.id}&br=192000`),
                window.$axios.get(`/album?id=${obj.albumId}`)
            ]).then(window.$axios.spread(function (a, b) {
                let music = null;
                const index = self.playListId.indexOf(obj.id);
                if (index >= 0) {
                    music = self.playList.splice(index, 1)[0];
                    self.playListId.splice(index, 1);
                }
                else {
                    const dataA = a.data.data[0];
                    const dataB = b.data.album;
                    music = obj;
                    const time = music.duration / 60;
                    const mm = Math.floor(time).toString().padStart(2, "0");
                    const ss = Math.round((time - mm) * 60).toString().padStart(2, "0");
                    music.time = `${mm}:${ss}`;
                    music.favorite = self.checkFavorite(music.id);
                    music.url = dataA.url;
                    music.imgUrl = dataB.picUrl;
                }
                if (self.playList[0] && self.playList[0].id == -1) self.playList = [];
                self.playList.unshift(music);
                self.playListId.unshift(music.id);
                self.count = self.playList.length;
                self.setMusic(0);
            }))
        },
        setMusic(index) {
            this.index = index;
            const music = this.playList[index];
            this.url = music.url;
            this.playedTime = 0;
            this.currentTime = 0;
            this.$refs["audio"].currentTime = 0;
            this.duration = music.duration;
            this.formatTime();
        },
        callList() {
            this.showPlayList = !this.showPlayList;
        },
    },
    created() {
        window.addToList = this.addToList;
        this.formatTime();
        this.count = 0;
    },
    mounted() {
        const self = this;
        this.$refs["audio"].addEventListener("play", function () {
            self.playing = true;
        });
    },
};

export default vm;

