import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入bootstrap
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.css"
//引入全局样式表
import './assets/css/style.css';
//引入动画库
import VWave from 'v-wave'


const app = createApp(App)
app.use(store)
app.use(ElementPlus)
app.use(VWave)
app.use(router).mount('#app')

