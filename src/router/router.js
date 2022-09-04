import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => import('@/views/recommend')
const Singer = () => import('@/views/singer')
const MV = () => import('@/views/mv.vue')
const TopList = () => import('@/views/topList')
const Search = () => import('@/views/search')
const HotSongMusic = () => import('@/views/recommend/hotSongMusic')
const SingerSongs = () => import('@/components/singer/singerSongsList.vue')
const TopListMusic = () => import('@/views/topListMusic/topListMusic.vue')

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
    path: '/singerSongs',// 歌手歌曲
    component: SingerSongs,
    meta:{a:true}
  },
  {
    path: '/topListMusic',// 榜单歌曲
    component: TopListMusic ,
    meta:{a:true}
  },
  {
    path: '/singer',
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
