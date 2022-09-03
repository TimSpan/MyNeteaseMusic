<template>
  <div class="top-list">
    <div class="top-list-content">
      <ul>
        <li class="item" v-for="item in topList" :key="item.id" >
          <div class="icon">
            <img width="100" height="100" :src="item.coverImgUrl" />
          </div>
          <!-- <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span>{{ index + 1 }}. </span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTopList, getTopListSongs } from '@/api/topList'

export default {
  components: {},
  data() {
    return {
      topList: [],
      // id: 0,
    }
  },
  mounted() {
    console.log(this.$refs.songid)
  },
  async created() {
    
    //获取所有榜单
    const res = await getTopList()
    console.log(res)
    this.topList = res.data.list

 

    //获取榜单歌曲

    const result = await getTopListSongs()
    // console.log(result)
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.top-list {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  margin-bottom: 60px;
  .top-list-content {
    height: 100%;
    overflow: scroll;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
  }
}
</style>
