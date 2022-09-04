<template>
  <div class="music-list">
    <div class="fixed background">
      <div class="back" @click="$router.go(-1)">
        <i class="icon-back"></i>
      </div>

      <!-- 标题 -->
      <h1 class="title">{{ name }}</h1>
    </div>

    <div class="bg-image">
      <!-- <img class="images" :src="playlist.coverImgUrl" alt="" /> -->
      <van-image class="images" :src="img">
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
  </div>
</template>

<script>
export default {
  props: ['singerTopSongs', 'img', 'name'],
}
</script>

<style lang="scss" scoped>
:root {
  --van-image-placeholder-background-color: rgba(0, 0, 0, 0.3) !important;
  // --van-image-loading-icon-color:#333;
  --van-background-color: rgba(0, 0, 0, 0.3);
}
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
    position: relative;
    // padding-left: 0.4rem;
    top: 0;
    left: 20%;
    width: 60%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    // margin: 0 auto;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    background-color: $color-background !important;
    position: relative;
    width: 100%;
    height: 7.5rem;
    // background-size: contain;
    // transform-origin: top;

    .images {
      opacity: 0.6;
      filter: blur(1px);
      // background-color: $color-background !important;
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
}
</style>
