import { createApp } from 'vue';
import axios from "axios";
import { ElButton, ElScrollbar, ElTabs, ElTabPane, ElTable, ElLoading, ElTableColumn, ElPagination } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App/App.vue';

// import VueRouter from "vue-router";
import router from "./router.js";

axios.defaults.baseURL = "/api";
window.$axios = axios;

const app = createApp(App);
app.use(router);
app.use(ElLoading);
app.component(ElButton.name, ElButton);
app.component(ElScrollbar.name, ElScrollbar);
app.component(ElTabs.name, ElTabs);
app.component(ElTabPane.name, ElTabPane);
app.component(ElTable.name, ElTable);
app.component(ElTableColumn.name, ElTableColumn);
app.component(ElPagination.name, ElPagination);

app.mount('#app');
