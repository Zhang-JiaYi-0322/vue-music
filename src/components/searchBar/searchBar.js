export default {
  data() {
    return {
      searchFocus: false,
      // searchFocus: true,
      searchKey: "搜索",
      history: [
        "周杰伦",
        "ささやかな祈り",
        "今井麻美",
        "加勒比海盗",
        "love live",
        "love live",
        "love live",
        "love live",
        "love live",
      ],
      hots: [],
      showAll: false,
      error: false,
      onContent: false,
    };
  },
  created() { },
  methods: {
    getFocus() {
      this.getInfo();
      this.searchFocus = true;
      this.searchKey = "";
    },
    loseFocus() {
      if (!this.onContent) {
        // this.$router.push("/searchResult/" + this.searchKey);
        this.searchFocus = false;
      }
    },
    search(key = undefined) {
      const info = key ? key : this.searchKey;
      let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      const index = history.indexOf(info)
      if (index >= 0) {
        history.splice(index, 1);
      }
      history.unshift(info);
      if (history.length > 20) history.length = 20;
      localStorage.setItem("searchHistory", JSON.stringify(history));
      this.getHistory();

      this.route(info);
    },
    getHistory() {
      this.history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    },
    clearHistory() {
      this.history = [];
      localStorage.setItem("searchHistory", "[]");
      this.$refs.input.focus();
    },
    showAllHistory() {
      this.showAll = true;
      this.$refs.input.focus();
    },
    getInfo() {
      // 获取热搜榜
      window.$axios
        .get("/search/hot/detail")
        .then((response) => {
          if (response.status == 200) {
            this.hots = response.data.data;
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          // console.log(e);
          this.error = true;
        });

      // 获取历史记录
      this.getHistory();
    },
    // hideSelf(key) {
    //   this.searchKey = key;
    //   this.searchFocus = false;
    // },
    route(key) {
      this.$router.push("/searchResult/" + key);
      this.searchKey = key;
      this.searchFocus = false;
    },
  },
};