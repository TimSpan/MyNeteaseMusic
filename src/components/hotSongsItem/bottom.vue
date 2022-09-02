<template>
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
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  props: ['songs'],
  mounted() {
    // this.footerMusic.updataTime()
  },
  // setup(props) {
  //   // console.log(props)
  // },
  // created() {
  //   // console.log(this.songs)
  // },
  computed: {
    ...mapState(['playList','playListIndex','currentTime','lyricList','footerMusic'])
  },
  methods: {
    playMusic: function (index) {
      this.updatePlayList(this.songs)
      this.updatePlayListIndex(index)
      this.updateIsBtnShow(false)
      // footerMusic.updataTime()
      this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
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
      font-size: $font-size-small;
      color: $color-text-d;
    }
  }
}
</style>
