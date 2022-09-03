<template>
  <div class="player">
    <Transition>
      <div class="normal-player">
        <div class="background">
          <img :src="playList[playListIndex].al.picUrl" />
        </div>

        <!-- 顶部区域 -->
        <div class="top">
          <div class="back" @click="goBack">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ playList[playListIndex].al.name }}</h1>
          <h2 class="subtitle">{{ playList[playListIndex].ar[0].name }}</h2>
        </div>

        <!-- 中间区域 -->
        <div class="middle">
          <div class="middle-l" v-show="!islyricShow">
            <!-- cd区域 -->
            <div class="cd-wrapper">
              <div class="cd">
                <img
                  class="img-al"
                  :src="playList[playListIndex].al.picUrl"
                  :class="{ img_active: !isBtnShow, img_pauesd: isBtnShow }"
                  @click="islyricShow = true"
                />
              </div>
            </div>
          </div>
          <div
            class="middle-r"
            ref="offset"
            v-show="islyricShow"
            @click="islyricShow = false"
          >
            <div class="lyric-wrapper">
              <div>
                <!-- 实现歌词列表高亮显示 -->
                <p
                  class="text"
                  v-for="(item, i) in lyric"
                  :key="i"
                  :class="{
                    current:
                      currentTime * 1000 >= item.time &&
                      currentTime * 1000 < item.pre,
                  }"
                >
                  {{ item.lrc }}
                </p>
              </div>
              <!-- <div class="pure-music" >
                <p v-for="(item, i) in lyric" >{{ item.lrc }}</p>
              </div> -->
            </div>
          </div>
        </div>
        <!-- 底部区域 -->
        <div class="bottom">
          <!-- 进度条部分 -->
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot active"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l"> {{ formatTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <input
                type="range"
                class="range"
                min="0"
                :max="this.duration"
                v-model="currentTime"
                step="0.05"
              />
            </div>
            <span class="time time-r">
              <!-- {{ (duration / 100).toFixed(2) }} -->
              {{ formatTime(this.duration) }}
            </span>
          </div>

          <!-- 按钮图标部分 -->
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" @click="goPlay(-1)">
              <i class="icon-prev"></i>
            </div>

            <!-- 播放暂停按钮 -->
            <div class="icon i-center" v-if="isBtnShow">
              <i class="icon-play" @click="play"></i>
            </div>
            <div class="icon i-center" v-else>
              <i class="icon-pause" @click="play"></i>
            </div>

            <div class="icon i-right" @click="goPlay(1)">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapMutations, mapState, useStore } from 'vuex'
// import { computed, ref, onMounted } from 'vue'
import { formatTime } from '@/assets/js/util'

export default {
  setup() {
    // console.log(props);
    return {
      formatTime,
    }
  },
  data() {
    return {
      islyricShow: false,
    }
  },

  mounted() {
    // console.log(this.lyricLsit.lyric) //未切割的歌词数据
    // console.log(this.lyric) //切割后的歌词数据
  },
  props: ['play'],
  created() {},
  computed: {
    ...mapState([
      'playList', // 歌曲列表
      'playListIndex', // 歌曲索引
      'detailShow', // 控制 播放组件弹出
      'isBtnShow', // 按钮显示
      'lyricLsit', // 歌词
      'currentTime', // 当前播放时间
      'duration', //  从vuex获取 歌曲总时长
    ]),
    lyric: function () {
      let arr
      if (this.lyricLsit.lyric) {
        arr = this.lyricLsit.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3)
          let sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lrc = item.slice(11, item.length)
          // 转换成整数
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)

          // console.log(min, sec, mill, lrc)// 打印歌词
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.length)
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          }
          return { min, sec, mill, lrc, time }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            // 为item添加一个属性，用来表示下一句歌词
            item.pre = 10000
          } else {
            item.pre = arr[i + 1].time
          }
        })
      }
      // console.log(arr)
      return arr
    },
  },

  methods: {
    goBack() {
      this.updateDetailShow()
    },
    goPlay(num) {
      // console.log(num)
      // 通过改变下标实现切换上一首  和  下一首
      let index = this.playListIndex + num
      // console.log(index)
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index === this.playList.length) {
        index = 0
      }
      this.updatePlayListIndex(index)
      this.updateIsBtnShow(false)
    },
    ...mapMutations([
      'updateDetailShow',
      'updatePlayListIndex',
      'updateIsBtnShow',
    ]),
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector('p.current') // 一定是p.current
      // console.log([p]) // 中括号打印可以看到引用信息
      // 确认拿到p元素后 再执行，以防拿不到导致程序中断
      if (p) {
        if (p.offsetTop > 200) {
          this.$refs.offset.scrollTop = p.offsetTop - 200
        }
      }

      // 如果歌曲播放完了，自动下一首歌
      // 在这之前已经把 currentTime 和 duration 转成整数型了
      // 所以 可以判断值是否相等
      if (newValue == this.duration) {
        this.updatePlayListIndex(this.playListIndex + 1)
      }
      // 在这之前已经把 currentTime 和 duration 转成整数型了
      console.log(newValue, this.duration)
    },
  },
}
</script>

<style lang="scss" scoped>
.range {
  -webkit-appearance: none;
  -moz-appearance: none;
  // position: absolute;
  // left: 50%;
  // top: 50%;
  width: 100%;
  margin-bottom: 0.24rem;
  // transform: translate(-50%, -50%);
}
input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: rgba(59, 173, 227, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(59, 173, 227, 1)),
    color-stop(25%, rgba(87, 111, 230, 1)),
    color-stop(51%, rgba(152, 68, 183, 1)),
    color-stop(100%, rgba(255, 53, 127, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
  height: 2px;
}
input[type='range']:focus {
  outline: none;
}
input[type='range']::-moz-range-track {
  -moz-appearance: none;
  background: rgba(59, 173, 227, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(59, 173, 227, 1)),
    color-stop(25%, rgba(87, 111, 230, 1)),
    color-stop(51%, rgba(152, 68, 183, 1)),
    color-stop(100%, rgba(255, 53, 127, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
  height: 2px;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 3px solid;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  max-width: 80px;
  position: relative;
  bottom: 6px;
  background-color: $color-theme;
  cursor: -webkit-grab;
  -webkit-transition: border 1000ms ease;
  transition: border 1000ms ease;
}
input[type='range']::-moz-range-thumb {
  -moz-appearance: none;
  border: 3px solid;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  max-width: 80px;
  position: relative;
  bottom: 6px;
  background-color: $color-theme;
  cursor: -moz-grab;
  -moz-transition: border 1000ms ease;
  transition: border 1000ms ease;
}
.range.blue::-webkit-slider-thumb {
  border-color: rgb(59, 173, 227);
}
.range.ltpurple::-webkit-slider-thumb {
  border-color: rgb(87, 111, 230);
}
.range.purple::-webkit-slider-thumb {
  border-color: rgb(152, 68, 183);
}
.range.pink::-webkit-slider-thumb {
  border-color: rgb(255, 53, 127);
}
.range.blue::-moz-range-thumb {
  border-color: rgb(59, 173, 227);
}
.range.ltpurple::-moz-range-thumb {
  border-color: rgb(87, 111, 230);
}

.range.purple::-moz-range-thumb {
  border-color: rgb(152, 68, 183);
}
.range.pink::-moz-range-thumb {
  border-color: rgb(255, 53, 127);
}
input[type='range']::-webkit-slider-thumb:active {
  cursor: -webkit-grabbing;
}
input[type='range']::-moz-range-thumb:active {
  cursor: -moz-grabbing;
}

// 动画部分
.img_active {
  animation-play-state: running !important;
}
.img_pauesd {
  animation-play-state: paused !important;
}
@keyframes rotate_ar {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            .img-al {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
              animation: rotate_ar 20s linear infinite;
            }
            // .playing {
            //   animation: rotate 20s linear infinite;
            // }
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: scroll;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text !important;
              font-size: $font-size-large !important;
            }
          }
          .current {
            color: $color-text !important;
            font-size: $font-size-large !important;
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
          .range {
            width: 100%;
          }
        }
      }
      .operators {
        display: flex;
        align-items: center;
        // vertical-align: middle;
        // justify-content: space-around;
        .icon {
          flex: 1;
          color: #ffcd32;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 0.4rem;
          text-align: center;
          .icon-play {
            font-size: 40px;
          }
          .icon-pause {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-theme;
        }
      }
    }
  }
}
</style>
