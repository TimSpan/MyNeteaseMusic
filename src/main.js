import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import '@/assets/scss/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
// import { ConfigProvider } from 'vant'
// 有需要再导入 tailwind.css
// import "tailwindcss/tailwind.css"

let app = createApp(App)
// app.use(ConfigProvider);
app.use(router)
app.use(store)
app.use(Vant)
// app.mount('#app')一定是在最后面
app.mount('#app')
