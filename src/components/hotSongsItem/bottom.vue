<template>
  <!-- <van-loading > 加载中 -->
  <ul class="song-list">
    <li
      @click="playMusic(index)"
      class="item"
      v-for="(song, index) in songs"
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
  <!-- </van-loading> -->
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  props: ['songs'],
  mounted() {},

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
      this.updatePlayList(this.songs) // 更新vuex 的歌曲列表
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
      // margin-right: 0.2rem;
      padding-right: 0.2rem;
      // text-overflow: ellipsis;
      // overflow: hidden;
      // white-space: nowrap;
    }
  }
}
</style>
