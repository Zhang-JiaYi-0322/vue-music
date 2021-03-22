import { createRouter, createWebHistory } from "vue-router";

import searchResult from "./components/mainFrame/searchResult/searchResult.vue";
import playList from "./components/mainFrame/playList/playList.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: "/", redirect: "/searchResult/沦陷" },
        { path: "/searchResult/:info", component: searchResult },
        { path: "/playList/:id/:name", component: playList }
    ],
});

export default router;