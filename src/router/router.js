import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => import('@/views/recommend')
const Singer = () => import('@/views/singer')
const MV = () => import('@/views/mv.vue')
const TopList = () => import('@/views/topList')
const Search = () => import('@/views/search')
const HotSongMusic = () => import('@/views/recommend/hotSongMusic')
const SingerSongsList = () => import('@/views/singerMusic/singerSongsList.vue')
const TopListMusic = () => import('@/views/topListMusic/topListMusic.vue')
const Login = () => import('@/views/login')

import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: Recommend,
  },
  {
    path: '/hotSongMusic', // 推荐歌单歌曲
    component: HotSongMusic,
    meta: { a: true }
    // 路由权限控制方式：路由元信息（meta）
    // meta 数据并不是只读的，我们可以在代码中根据需求动态地改变它。
  },
  {
    path: '/SingerSongsList',// 歌手歌曲
    component: SingerSongsList,
    meta:{a:true}
  },
  {
    path: '/topListMusic',// 榜单歌曲
    component: TopListMusic ,
    meta:{a:true}
  },
  {
    path: '/singer',//歌手
    component: Singer,
  },
  {
    path: '/mv',
    component: MV,
  },
  {
    path: '/topList',
    component: TopList,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/login',// 登录用户中心
    component: Login,
    meta:{a:true,footer:true}
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//全局路由守卫，针对底部组件 的显示隐藏
router.beforeEach((to,from) => {
  if (to.path == '/logon') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
    
  }
})

export default router
