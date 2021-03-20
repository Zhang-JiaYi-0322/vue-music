// import { use, createApp } from 'vue';
import Vue from 'vue';
import axios from "axios";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { ElButton, ElScrollbar } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';

axios.defaults.baseURL = "/api";
window.$axios = axios;

const app = Vue.createApp(App);
app.component(ElButton.name, ElButton);
app.component(ElScrollbar.name, ElScrollbar);
app.mount('#app');
