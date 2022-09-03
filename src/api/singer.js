import request from './base'
// 获取热门歌手
export function getSinger() {
  return request({
    method: 'GET',
    url: '/top/artists?offset=0',
  })
}
//获取歌手热门50首歌曲
export function getSingerSongs(singerID) {
  return request({
    method: 'GET',
    url: `/artist/top/song?id=${singerID}`,
  })
}