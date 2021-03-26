import loading from "../../loading.vue";

export default {
    data() {
        return {
            error: false,
            onLoad: false,
            titleInfo: {},
            detail: [],
        };
    },
    methods: {

    },
    created() {
        // /artist/top/song?id=6452
        const self = this;
        const id = this.$route.params.id;

        window.$axios
            .all([
                window.$axios.get("/artist/detail?id=" + id),
                window.$axios.get("/artist/desc?id=" + id)
            ])
            .then(window.$axios.spread(function (a, b) {
                if (a.status == 200 && b.status == 200) {
                    self.titleInfo = a.data.data.artist;
                    self.detail = b.data.introduction;
                    self.detail.unshift({
                        ti: "简介",
                        txt: "\r\r" + self.titleInfo.briefDesc
                    });
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