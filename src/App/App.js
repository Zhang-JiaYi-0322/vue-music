import search from "../components/searchBar/searchBar.vue";

export default {
  name: "App",
  data() {
    return {
      navData: [
        { label: "发现音乐", strong: true, icon: false, id: "foundMusic" },
        {
          label: "创建的歌单", strong: false, icon: false, route: false, children: [
            { label: "我喜欢的音乐", favorite: true, id: "favorite" },
            { label: "因为没做账号相关", favorite: false },
            { label: "创建的歌单不好保存", favorite: false },
            { label: "所以没做相关内容", favorite: false },
          ]
        },
        {
          label: "收藏的歌单", strong: false, icon: false, route: false, children: [
            { label: "暂无歌单", icon: false, route: false }
          ]
        }
      ]
    };
  },
  methods: {
    getClass(data) {
      if (data.favorite) {
        return "el-icon-star-off icon";
      }
      else if (data.strong !== false && data.icon !== false) {
        return "el-icon-notebook-2 icon";
      }
      else {
        return "";
      }
    },
    getStyle(data) {
      const style = {};
      if (data.strong !== false) {
        style.color = "#666";
        style["font-size"] = "16px";
      }
      if (data.label == "暂无歌单") {
        style["font-style"] = 'italic';
      }
      return style;
    },
    labelFormatter: function (text) {
      if (text.length > 9) {
        text = text.slice(0, 10) + "...";
      }
      return text;
    },
    loadCreatedPlayList() {
      // let storage = JSON.parse(localStorage.getItem("createdPlayList") || "[]");
      // this.navData[1].children.concat(storage)；
    },
    loadSavedPlayList() {
      const storage = JSON.parse(localStorage.getItem("savedPlayList") || "[]");
      if (storage.length > 0) {
        this.navData[2].children = storage;
      }
      else {
        this.navData[2].children = [{ label: "暂无歌单", icon: false, route: false }];
      }
      // localStorage.setItem("savedPlayList", JSON.stringify(storage));
    },
    route(data) {
      // 发现音乐
      if (data.id == "foundMusic") {
        this.$router.push("/foundMusic");
      }
      // 我喜欢的音乐
      else if (data.id == "favorite") {
        this.$router.push("/playList/favorite/我喜欢的音乐");
      }
      // 其他
      else if (data.route !== false) {
        this.$router.push(`/playList/${data.id}/${data.label}`);
      }
    },
    reloadList() {
      this.loadCreatedPlayList();
      this.loadSavedPlayList();
    },
  },
  components: {
    search,
  },
  created() {
    this.loadCreatedPlayList();
    this.loadSavedPlayList();
  },
};