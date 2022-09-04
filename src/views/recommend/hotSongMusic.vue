<template>
  <keep-alive>
    <div class="music-list">
      <div class="fixed">
        <div class="back" @click="$router.go(-1)">
          <i class="icon-back"></i>
        </div>
        <!-- 标题 -->
        <h1 class="title">{{ state.name }}</h1>
      </div>

      <div class="bg-image">
        <van-image class="images" :src="state.img">
          <template v-slot:loading>
            <van-loading />
          </template>
        </van-image>
        <!-- 随机播放全部 -->
        <div class="play-btn-wrapper">
          <div class="play-btn">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <ul class="song-list">
        <li
          @click="playMusic(index)"
          class="item"
          v-for="(song, index) in state.songs"
          :key="index"
        >
          <div class="column">
            <h2 class="name">{{ song.name }}</h2>

            <p class="desc" v-for="(song1, index) in song.ar" :key="index">
              {{ song1.name }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </keep-alive>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicAllList } from '@/api/item'
import { mapMutations, mapState } from 'vuex'
//引入子组件

export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单详情
      songs: [], //所有歌曲
      name: '', //歌单名字
      img: '', // 歌单图片
    })
    onMounted(async () => {
      // 推荐歌单详情
      let id = useRoute().query.id
      console.log(id);
      state.name = useRoute().query.name
      state.img = useRoute().query.img
      // 获取歌单所有歌曲
      let result = await getMusicAllList(id)
      // console.log(result)
      state.songs = result.data.songs
    })
    return { state }
  },
  computed: {
    ...mapState([
      'playList',
      'playListIndex',
      'currentTime',
      'lyricList',
      'footerMusic',
    ]),
  },
  methods: {
    playMusic: function (index) {
      // 接收传递过来的歌曲下标
      this.updatePlayList(this.state.songs) // 更新vuex 的歌曲列表
      this.updatePlayListIndex(index) // 更新vuex 的歌曲歌曲下标
      this.updateIsBtnShow(false) // 更新播放按钮的布尔值
      this.$store.dispatch('getLyric', this.playList[this.playListIndex].id) // 更新歌词
    },
    ...mapMutations([
      'updatePlayList',
      'updatePlayListIndex',
      'updateIsBtnShow',
    ]),
  },
}
</script>
<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  width: 100%;
  .fixed {
    position: fixed;
    background-color: #333;
    top: 0;
    left: 0;
    right: 0;
    height: 0.8rem;
    z-index: 100;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0.12rem;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      line-height: 40px;
      padding-left: 0.2rem;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    padding-left: 0.4rem;
    top: 0;
    left: 10%;
    width: 60%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    background-color: $color-background !important;
    position: relative;
    width: 100%;
    height: 7.5rem;
    .images {
      opacity: 0.6;
      filter: blur(1px);
      width: 100%;
      height: 100%;
      background-size: cover;
    }

    .play-btn-wrapper {
      position: absolute;
      bottom: 3rem;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
  }
  .song-list {
    margin-bottom: 30px;
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      box-sizing: border-box;
      height: 64px;
      font-size: $font-size-medium;
      padding-left: 0.4rem;

      .name {
        width: 100%;
        margin-bottom: 2px;
        @include no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        display: inline-block;
        font-size: $font-size-small;
        color: $color-text-d;
        padding-right: 0.2rem;
      }
    }
  }
}
</style>
