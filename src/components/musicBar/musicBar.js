let vm;

vm = {
    data() {
        return {
            playList: [
                {
                    id: -1,
                    imgUrl: require("../../assets/AppLogo.png"),
                    title: "暂无音乐",
                    artist: "artist",
                    favorite: false,
                    favoriteAble: false,
                }
            ],
            index: 0,
            playedTime: 0,
            currentTime: 0,
            lastTime: 0,
            duration: 240,
            playedTimeString: "00:00",
            durationString: "--:--",
            playing: false,
            playModeList: [
                "icon ion-shuffle btn",
                "icon ion-arrow-return-right btn",
                "icon ion-navicon-round btn"
            ],
            playMode: 0,
            sound: 50,
            url: "",
            helper: 0,
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
        checkFavorite() {
            const id = this.playList[this.index].id;
            const favorite = JSON.parse(localStorage.getItem("favorite") || "[]");
            const index = favorite.indexOf(id);
            this.playList[this.index].favorite = index >= 0 ? true : false;
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
                    console.log(-1);
                }
                else {
                    console.log(1);
                }
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
    },
    created() {
        this.formatTime();
        // 最终决戦地
        // /song/url?id=747800,33894312
        window.$axios
            .get('/song/url?id=747800&br=192000')
            .then(res => {
                this.url = res.data.data[0].url;
                this.formatTime();
            })
    },
    mounted() {
        const self = this;
        this.$refs["audio"].addEventListener("play", function () {
            self.playing = true;
        });
    },
};

export default vm;

