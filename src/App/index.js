import search from "../components/searchBar/searchBar.vue";

export default {
  name: "App",
  data() {
    return {
      navData: [
        {
          label: "创建的歌单", children: [
            { label: "我喜欢的音乐" }
          ]
        },
        {
          label: "收藏的歌单", children: [{
            label: "暂无歌单"
          }]
        }
      ]
    };
  },
  methods: {},
  components: {
    search,
  },
};