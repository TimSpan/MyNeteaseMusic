import request from './base'

export function getMV() {
  return request({
    method: 'GET',
    url: '/personalized/mv',
  })
}












