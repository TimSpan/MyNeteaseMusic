import request from './base'
// 获取首页轮播图的数据
export function getSinger() {
  return request({
    method: 'GET',
    url: '/top/artists?offset=0&limit=50',
  })
}
//获取歌手全部歌曲
export function getSingerSongs() {
  return request({
    method: 'GET',
    url: '/artist/songs?id=2116&limit=25',
  })
}