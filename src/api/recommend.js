import request from './base'
// 获取首页轮播图的数据
export function getBanner() {
  return request({
    method: 'GET',
    url: '/banner?type=2',
  })
}
//获取推荐歌单
export function getMusicList() {
  return request({
    method: 'GET',
    url: '/personalized?limit=25',
  })
}
