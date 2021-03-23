export default {
    data() {
        return {
            imgUrl: require("../../assets/AppLogo.png"),
            title: "暂无音乐",
            artist: "artist",
            playedTime: 0,
            duration: 3600,
            playedTimeString: "00:00",
            durationString: "--:--",
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
        }
    },
    created() {
        this.formatTime();
    },
}