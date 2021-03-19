import { createApp } from 'vue';
import { ElButton } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';

const app = createApp(App);
app.component(ElButton.name, ElButton);
app.mount('#app');
