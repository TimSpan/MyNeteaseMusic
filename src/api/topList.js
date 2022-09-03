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