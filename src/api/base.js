import axios from 'axios'
const request = axios.create({
  // baseURL:  'https://api-music.imsyy.top/'
  baseURL: 'http://1.117.229.35:3000/'//晏斌
  // baseURL: 'https://autumnfish.cn/'
  // baseURL: 'https://music.cyrilstudio.top/' //尚硅谷
})
export default request