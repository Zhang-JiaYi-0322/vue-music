import loading from "../../loading.vue";

export default {
    data() {
        return {
            error: false,
            onLoad: false,
            titleInfo: {},
            detail: [],
            albums: [],
            index: "first",
        };
    },
    methods: {
        formatDate(ms) {
            const time = new Date(ms);
            const yyyy = time.getFullYear();
            const mm = (time.getMonth() + 1).toString().padStart(2, "0");
            const dd = time.getDate().toString().padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        },
        rowClick(row) {
            this.$router.push(`/album/${row.id}/${row.name}`);
        }
    },
    created() {
        // /artist/top/song?id=6452
        const self = this;
        const id = this.$route.params.id;

        window.$axios
            .all([
                window.$axios.get("/artist/detail?id=" + id),
                window.$axios.get("/artist/desc?id=" + id),
                window.$axios.get("/artist/album?id=" + id)
            ])
            .then(window.$axios.spread(function (a, b, c) {
                if (a.status == 200 && b.status == 200 && c.status == 200) {
                    self.titleInfo = a.data.data.artist;
                    self.detail = b.data.introduction;
                    self.detail.unshift({
                        ti: "简介",
                        txt: "\r\r" + self.titleInfo.briefDesc
                    });
                    self.albums = c.data.hotAlbums;
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