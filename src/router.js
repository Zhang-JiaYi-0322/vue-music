import { createRouter, createWebHistory } from "vue-router";

import searchResult from "./components/mainFrame/searchResult.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: "/", redirect: "/searchResult/沦陷" },
        { path: "/searchResult/:info", component: searchResult }
    ],
});

export default router;