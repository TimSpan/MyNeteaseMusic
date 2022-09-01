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
      <!-- 播放按钮 -->
      <!-- <svg
        class="icon bofang"
        aria-hidden="true"
        @click="play(-1)"
        v-if="isBtnShow"
      >
      
        <use xlink:href="#icon-bofanganniu"></use>
      </svg> -->
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
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      ></audio>

      <!-- 全屏弹出层 -->
      <van-popup
        v-model:show="detailShow"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
      >
        <Player 
        :play="play" 
        :isBtnShow="isBtnShow"
        :addDuration="addDuration"
        :playList="playList"
         />
      </van-popup>
    </div>
  </Transition>
</template>

<script>
// import ProgressCircle from './progress-circle'
// import useCd from './use-cd'
import Player from './player.vue'
import { mapState, useStore, mapMutations } from 'vuex'
export default {
  data() {
    return {
      intervalID: 0,
        
    }
  },
  components: {
    Player,
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'detailShow', 'isBtnShow','currentTime']),
  },
  // components: {
  //   ProgressCircle,
  // },
  
  mounted() {
    // console.log(this.$refs.audio.duration);
    // console.log(this.$refs)
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    // this.updataTime()//渲染页面的时候也需要用到这个函数
    this.updataTime()
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
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

    // 一个 时间函数，用于控制歌词显示
    // 当播放歌曲时，就需要持续触发这个函数
    // 这个函数不仅在播放音乐的时候需要用到，渲染页面的时候也需要用到
    updataTime() {
      this.intervalID = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
    },
    ...mapMutations([
      'updateDetailShow',
      'updateIsBtnShow',
      'updateCurrentTime',
      'updateDuration'
    ]),
  },
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
