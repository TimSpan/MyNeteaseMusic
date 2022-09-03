import axios from 'axios'
const request = axios.create({
  baseURL:  'https://music.cyrilstudio.top/' || 'https://autumnfish.cn/' || 'https://music.cyrilstudio.top/' || 'https://api-music.imsyy.top/',
})
export default request