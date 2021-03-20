import { createApp } from 'vue';
import axios from "axios";
import { ElButton, ElScrollbar, ElTabs, ElTabPane } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';

// import VueRouter from "vue-router";
import router from "./router.js";

axios.defaults.baseURL = "/api";
window.$axios = axios;

const app = createApp(App);
app.use(router);
app.component(ElButton.name, ElButton);
app.component(ElScrollbar.name, ElScrollbar);
app.component(ElTabs.name, ElTabs);
app.component(ElTabPane.name, ElTabPane);

app.mount('#app');
