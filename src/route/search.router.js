import VueRouter from "vue-router";

import searchResult from "../components/mainFrame/searchResult.vue";

const router = new VueRouter({
    routes: [
        { path: "/searchResult", component: searchResult }
    ],
});

export default router;