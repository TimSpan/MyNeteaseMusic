import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => import('@/views/recommend')
const Singer = () => import('@/views/singer')
const TopList = () => import('@/views/topList')
const Search = () => import('@/views/search')
const SingerDetail = () => import('@/views/singer-detail')
const HotSongMusic = () => import('@/views/recommend/hotSongMusic')

const routes = [
  {
    path: '/',
    redirect: '/recommend',
    // meta:{a:true}
    
  },
  {
    path: '/recommend',
    component: Recommend,
    // meta:{a:true}
  },
  {
    path: '/hotSongMusic',
    component: HotSongMusic,
    meta:{a:true}
    
  },
  {
    path: '/singer',
    component: Singer,
    // meta:{a:true},
    children: [
      {
        path: ':id',
        component:SingerDetail
      }
    ]
  },
  {
    path: '/topList',
    component: TopList,
    // meta:{a:true}
  },
  {
    path: '/search',
    component: Search,
    // meta:{a:true}
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
