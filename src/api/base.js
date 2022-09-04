import axios from 'axios'
const request = axios.create({
  baseURL:  'http://1.117.229.35:3000/' || 'https://autumnfish.cn/' || 'https://music.cyrilstudio.top/' || 'https://api-music.imsyy.top/',
})
export default request