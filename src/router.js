import { createRouter, createWebHistory } from "vue-router";

import searchResult from "./components/mainFrame/searchResult/searchResult.vue";
import playList from "./components/mainFrame/playList/playList.vue";
import foundMusic from "./components/mainFrame/foundMusic/foundMusic.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/searchResult/偶像大师" },
        { path: "/foundMusic", component: foundMusic },
        { path: "/searchResult/:info", component: searchResult },
        { path: "/playList/:id/:name", component: playList }
    ],
});

export default router;