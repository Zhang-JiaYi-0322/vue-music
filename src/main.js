import { createApp } from 'vue';
import axios from "axios";
import { ElButton } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';

axios.defaults.baseURL = "/api";
window.$axios = axios;

const app = createApp(App);
app.component(ElButton.name, ElButton);
app.mount('#app');
