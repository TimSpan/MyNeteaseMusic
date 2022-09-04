<template>
  
    <div class="fixed">
      <div class="back" @click="$router.go(-1)">
        <i class="icon-back"></i>
      </div>
      <!-- 标题 -->
      <h1 class="title">{{ state.name }}</h1>
    </div>
    <!-- 歌曲列表 -->
    <keep-alive>
    
    
    <div class="top-list">
      <div class="top-list-content">
        <ul>
          <li
            v-for="(item, index) in state.topSongs"
            :key="index"
            class="item"
            @click="playMusic(index)"
          >
            <span class="index">{{ index + 1 }}</span>
            <van-image :src="item.al.picUrl" class="img" lazy-load>
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>

            <div class="right">
              <p class="name">{{ item.name }}</p>
              <p class="singerName">
                <span v-for="(item, i) in item.ar" :key="i">
                  {{ item.name }}</span
                >
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </keep-alive>

</template>

<script>
import { getLimitMusicTwo } from '@/api/topList'
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MusicMyTopListMusic',

  setup() {
    const state = reactive({
      topSongs: [], //所有歌曲列表
      name: '',
    })
    onMounted(async () => {
      let topID = useRoute().query.id
      state.name = useRoute().query.name
      let res = await getLimitMusicTwo(topID)
      // console.log(res)
      state.topSongs = res.data.songs
      // console.log(state.topSongs)
    })
    return { state }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'currentTime', 'lyricList']),
  },
  methods: {
    playMusic: function (index) {
      // 接收传递过来的歌曲下标
      this.updatePlayList(this.state.topSongs) // 更新vuex 的歌曲列表
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
  // data() {
  //   return {
  //     // topSongs: [],
  //   }
  // },

  // async created() {
  //   let id = this.$route.query.id
  //   console.log(this.$route.query.id)
  //   let res = await getTopListSongs(id)
  //   console.log(res)
  //   console.log(res.data.playlist.tracks);
  //   // this.topSongs = res.data.playlist.tracks
  //   // console.log(this.topSongs)
  // },
}
</script>

<style lang="scss" scoped>
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
  color: $color-theme;
}
.top-list {
  position: fixed;
  width: 100%;
  top: 0.8rem;
  bottom: 0;
  .top-list-content {
    height: 100%;
    overflow: scroll;
    .item {
      display: flex; // flex布局
      align-items: center;

      margin-top: 0.6rem;
      height: 0.6rem;
      .index {
        margin-right: 0.2rem;
        margin-left: 0.2rem;
        color: $color-theme;
        width: 0.4rem;
        text-align: center;
      }

      .van-image {
        // flex: 0 0 0.6rem;
        width: 1rem;
        height: 1rem;
        background-size: cover;
        border-radius: 3px !important;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 0.5rem;
        font-size: 0.2rem;
        margin-left: 0.4rem;
        @include no-wrap();
        .name {
        }
        .singerName {
          display: flex;
          span {
            margin-right: 0.4rem;
          }

          // justify-content: center;
        }
      }
    }
  }
}
</style>
