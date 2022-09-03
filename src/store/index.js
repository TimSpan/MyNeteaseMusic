import { createStore } from 'vuex'
import { getMusicLyric } from '../api/item'

export default createStore({
  state: {
    playList: [
      {
        name:"夜空中最亮的星",
        al: {
          id:2285010,
          name:"夜空中最亮的星",
          pic:109951165543196750,
          picUrl:
            'https://p2.music.126.net/Eef2K2KV9dT3XUA6_Ve-Rw==/109951165543196748.jpg',
          pic_str: '109951166521931227',
        },
        ar: [{
          name:'逃跑计划'
        }],

        id:25706282


      },
    ],

    playListIndex: 0, //默认下标
    isBtnShow: true, // 控制按钮的播放暂停
    detailShow: false, //歌曲详情页全屏的显示
    currentTime:0, //当前时间
    lyricLsit: {},// 歌词
    duration: 0,// 歌曲总时长
    // footerMusic:{} ,
  },
  getters: {},
  mutations: {
    

    // updateFooterMusic:function (state,value) {
    //   state.footerMusic = value
    // },

    // 更新歌曲总时长
    updateDuration: function (state, value) {
      state.duration = value
    },
    
    // 更新当前时间,用于控制歌词显示
    updateCurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value
    },
    // 切换播放按钮的显示
    updateIsBtnShow: function (state, value) {
      state.isBtnShow = value
    },
    // 更新播放列表
    updatePlayList: function (state, value) {
      state.playList = value
    },
    // 更新歌曲下标
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
      // console.log(state.playListIndex);
      // console.log(value);
    },
    // 歌曲详情页全屏的显示隐藏
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    // 更新歌词
    updatalyricLsit:function (state,value) {
      state.lyricLsit = value
    },
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      // console.log(res)
      context.commit('updatalyricLsit', res.data.lrc)
    },
  },
  modules: {},
  getters:{
    currentSong:(state) => {
      state.playList[state.playListIndex]
      
    }
    
  }
})
