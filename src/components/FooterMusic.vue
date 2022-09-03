<template>
  <Transition name="mini">
    <div class="mini-player">
      <div class="cd-wrapper">
        <div ref=" cdRef" class="cd">
          <!-- 迷你图片 -->
          <img
            class="mini-img"
            width="40"
            height="40"
            :src="playList[playListIndex].al.picUrl"
            ref="cdImageRef"
            :class="{ img_playing: !isBtnShow, img_pause: isBtnShow }"
          />
        </div>
      </div>

      <!-- 滑块 展示歌名  和  歌手 -->
      <div class="slider-wrapper" @click="updateDetailShow">
        <div class="slider-group">
          <div
            class="slider-page"
            v-for="(item, index) in playList"
            :key="index"
          >
            <h2 class="name">{{ playList[playListIndex].name }}</h2>
            <span
              class="desc"
              v-for="(item1, index2) in playList[playListIndex].ar"
              :key="index2"
              >{{ item1.name }}</span
            >
          </div>
        </div>
      </div>

      <!-- 播放暂停按钮 -->
      <div class="control" v-if="isBtnShow">
        <i class="icon-play-mini icon-mini" @click="play"></i>
      </div>
      <div class="control" v-else>
        <i class="icon-pause-mini icon-mini" @click="play"></i>
      </div>
      <!-- 播放列表 -->
      <div class="control">
        <i class="icon-playlist"></i>
      </div>

      <!-- <playlist></playlist> -->

      <!-- audio播放 -->
      <audio
        @canplay="getDuration"
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      ></audio>

      <!-- 全屏弹出层 -->
      <van-popup
        v-model:show="detailShow"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
      >
        <Player :play="play" :isBtnShow="isBtnShow" :playList="playList" />
      </van-popup>
    </div>
  </Transition>
</template>

<script>
// import ProgressCircle from './progress-circle'
// import useCd from './use-cd'
import { formatTime } from '@/assets/js/util'

import Player from './player.vue'
// import { getMusicDuration } from '../api/item'
import { mapState, useStore, mapMutations } from 'vuex'
// import { onMounted, ref } from 'vue'
export default {
  setup() {
    const store = useStore()
    let duration = 0
    const getDuration = (e) => {
      // console.log(e.target.duration);
      duration = parseInt(e.target.duration)
      // 拿到总时长的时候就 从小数 转成 整数
      store.commit('updateDuration', duration)
      // 把 duration 存入 vuex，方便 player组件访问
      // console.log(duration);
    }

    return {
      duration,
      formatTime,
      getDuration,
    }
  },
  data() {
    return {
      intervalID: 0,
    }
  },
  components: {
    Player,
  },
  computed: {
    ...mapState([
      'playList',
      'playListIndex',
      'detailShow',
      'isBtnShow',
      'currentTime',
    ]),
  },

  mounted() {
    //执行获取时长函数
    // console.log(typeof(this.$refs.audio.currentTime));
    // console.log(this.$refs.audio.duration);
    // console.log(this.$refs)
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    // this.updataTime()//渲染页面的时候也需要用到这个函数
    this.updataTime()
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
  },
  methods: {
    // 获取时长
    // async getDuration() {
    //   let res = await getMusicDuration(this.playList[this.playListIndex].id)
    //   // console.log(res)
    // },
    play() {
      // 控制音乐的播放暂停
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsBtnShow(false)
        // 启动定时器
        this.updataTime()
      } else {
        this.$refs.audio.pause()
        this.updateIsBtnShow(true)
        // 清除定时器
        clearInterval(this.intervalID)
      }
    },

    // 更新当前时间
    updataTime() {
      this.intervalID = setInterval(() => {
        // 一开始就把 currentTime 转成整数型
        this.updateCurrentTime(parseInt(this.$refs.audio.currentTime))
      }, 1000)
    },
    ...mapMutations([
      'updateDetailShow',
      'updateIsBtnShow',
      'updateCurrentTime', // 更新当前时间
      'updateFooterMusic',
      'updateDuration', // 更新 vuex 的 歌曲总时长duration
    ]),
  },
  created() {},
  // 监听下标发生了变化，就自动播放
  watch: {
    playListIndex: function () {
      this.$refs.audio.autoplay = true
      this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    },
    playList: function () {
      this.$refs.audio.autoplay = true
    },
  },
}
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      .mini-img {
        border-radius: 50%;
        animation: rotate_ar 10s linear infinite;
        &.img_playing {
          animation-play-state: running;
        }
        &.img_pause {
          animation-play-state: paused;
        }
        @keyframes rotate_ar {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      // 关键代码
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    margin-right: 0.2rem;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme;
    }
    .icon-mini {
      color: $color-theme;
      font-size: 32px;
    }
  }
  .icon {
    padding-right: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
    color: #ffcd32;
    .icon-color {
      color: #ffcd32;
    }
  }
}
</style>
