const vm = {
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
            duration: 0,
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
        valueChange(e) {
            this.playedTime = e;
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
            if (this.playList[this.index].id != -1) {
                this.playing = !this.playing;
            }
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

    },
    created() {
        this.formatTime();
    },
};

export default vm;