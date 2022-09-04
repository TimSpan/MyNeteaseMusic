<template>
  <keep-alive>
    <div class="top-list">
      <div class="top-list-content">
        <ul>
          <li v-for="item in topList" :key="item.id">
            <router-link
              class="item"
              :to="{
                path: '/topListMusic',
                query: { id: item.id, name: item.name },
              }"
            >
              <!-- 图片 -->

              <van-image :src="item.coverImgUrl" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <!-- 歌曲 -->
              <ul class="song-list">
                <li
                  class="song"
                  v-for="(song, index) in item.songs"
                  :key="song.id"
                  lazy-load
                >
                  <span>{{ index + 1 }}. </span>
                  <span>{{ song.name }}-{{ song.ar[0].name }}</span>
                </li>
              </ul>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import topListMusic from './topListMusic/topListMusic.vue'
import { getTopList, getLimitMusic } from '@/api/topList'
export default {
  components: {
    topListMusic,
  },
  data() {
    return {
      topList: [],
    }
  },
  async created() {
    //获取所有榜单
    const res = await getTopList()
    this.topList = res.data.list
    // console.log(this.topList)
    // console.log(this.AllSongs)

    this.topList.forEach(async (item, index) => {
      // console.log(index);
      const id = JSON.stringify(item.id)
      // console.log(id);

      const { data } = await getLimitMusic(id)// 限制了获取3首歌
      // console.log(data);
      this.topList[index].songs = data.songs //要添加进数组的元素
  
    })
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
      .van-image {
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
        overflow: scroll;
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
