import search from "../components/searchBar/searchBar.vue";

export default {
  name: "App",
  data() {
    return {
      navData: [
        { label: "发现音乐", strong: true, icon: false },
        {
          label: "创建的歌单", strong: false, icon: false, children: [
            { label: "我喜欢的音乐", favorite: true },
          ]
        },
        {
          label: "收藏的歌单", strong: false, icon: false, children: [
            { label: "暂无歌单", icon: false }
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
      if (text.length > 12) {
        text = text.slice(0, 13) + "...";
      }
      return text;
    },
    loadCreatedPlayList() {
      // let storage = JSON.parse(localStorage.getItem("createdPlayList") || "[]");
      // this.navData[1].children.push()
    },
    loadSavedPlayList() {
      // let storage = JSON.parse(localStorage.getItem("savedPlayList") || "[]");
      // localStorage.setItem("savedPlayList", JSON.stringify(storage));
    }
  },
  components: {
    search,
  },
};