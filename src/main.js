import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import '@/assets/scss/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'

import { Lazyload } from 'vant';

// import lazyPlugin from 'vue3-lazy'
// import { ConfigProvider } from 'vant'
// 有需要再导入 tailwind.css
// import "tailwindcss/tailwind.css"
import { Toast } from 'vant';
import 'vant/es/toast/style';
let app = createApp(App)
app.use(Lazyload);
app.use(Toast)

// app.use(ConfigProvider);
app.use(router)
app.use(store)
app.use(Vant)
// app.mount('#app')一定是在最后面
app.mount('#app')
