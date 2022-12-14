import request from './base'
// 获取推荐歌单详情的数据
export function getMusicList(data) {
  return request({
    method: 'GET',
    url: `/playlist/detail?id=${data}`,
  })
}
// 获取歌单所有歌曲
export function getMusicAllList(id) {
  return request({
    method: 'GET',
    url: `/playlist/track/all?id=${id}&offset=0&limit=50`,
  })
}

// 获取歌单详情
export function getMusicDetail(id) {
  return request({
    method: 'GET',
    url: `/playlist/detail?id=${id}&offset=0&limit=50`,
  })
}
//获取歌曲的歌词 /lyric?id=33894312
export function getMusicLyric(data){
  return request({
     method:"GET",
     url:`/lyric?id=${data}`
  })
}

// 获取歌曲的时长
export function getMusicDuration(data){
  return request({
    method:"GET",
    url:`/song/detail?ids=${data}`
  })
}
