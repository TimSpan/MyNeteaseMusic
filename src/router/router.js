import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => import('@/views/recommend')
const Singer = () => import('@/views/singer')
const MV = () => import('@/views/mv.vue')

const TopList = () => import('@/views/topList')
const Search = () => import('@/views/search')
const HotSongMusic = () => import('@/views/recommend/hotSongMusic')
const SingerSongs = () => import('@/components/base/singerSongsList.vue')


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
    path: '/hotSongMusic',
    component: HotSongMusic,
    meta:{a:true}
  },
  {
    path: '/singerSongs',
    component: SingerSongs,
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
