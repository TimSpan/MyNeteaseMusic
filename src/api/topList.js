import request from './base'
// 获取所有榜单
export function getTopList() {
  return request({
    method: 'GET',
    url: '/toplist',
  })
}
//获取榜单歌曲
export function getTopListSongs(id) {
  return request({
    method: 'GET',
    url: `/playlist/detail?id=${id}`,
  })
}
// 获取歌曲，但是限制数量 ,用于首屏展示
export function getLimitMusic(data) {
  return request({
    method: 'GET',
    url: `/playlist/track/all?id=${data}&offset=0&limit=3`,
  })
}
// 获取歌曲，但是限制数量 ,用于首屏展示
export function getLimitMusicTwo(data) {
  return request({
    method: 'GET',
    url: `/playlist/track/all?id=${data}&offset=0&limit=50`,
  })
}