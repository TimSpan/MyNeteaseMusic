import request from './base'

export function getMV() {
  return request({
    method: 'GET',
    url: '/personalized/mv',
  })
}

// 获取mv 播放地址
export function getMVurl(id) {
  return request({
    method: 'GET',
    url: `/mv/url?id=${id}`,
  })
}

// 获取mv 数据  包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据
export function getMVDetail(id) {
  return request({
    method: 'GET',
    url: `/mv/detail?mvid=${id}`,
  })
}












