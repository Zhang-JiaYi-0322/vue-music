import loading from "../../loading.vue";

export default {
    data() {
        return {
            error: false,
            onLoad: false,
            banner: [],
            playList: [],
        };
    },
    methods: {
        carouselClick(target) {
            if (target.url) {
                window.open(target.url);
            }
            else if (target.song) {
                console.log(target.song);
            }
        },
        playListClick(target) {
            this.$router.push(`/playList/${target.id}/${target.name}`);
        }
    },
    created() {
        const self = this;
        window.$axios
            .all([
                window.$axios.get("/homepage/block/page"),
                window.$axios.get("/personalized?limit=10")])
            .then(window.$axios.spread(function (a, b) {
                if (a.status == 200 && b.status == 200) {
                    self.banner = a.data.data.blocks[0].extInfo.banners;
                    self.playList = b.data.result;
                    self.onLoad = true;
                }
                else {
                    self.error = true;
                }
            }))
            .catch(() => {
                self.error = true;
            });
    },
    components: { loading },
}