<template>
  <div class="container">
    <keep-alive>
      <Top :playlist="state.playlist" />
    </keep-alive>

    <keep-alive>
      <Bottom :songs="state.songs" />
    </keep-alive>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicList, getMusicAllList } from '@/api/item'
//引入子组件
import Top from '@/components/hotSongsItem/top.vue'
import Bottom from '@/components/hotSongsItem/bottom.vue'

export default {
  setup() {
    const state = reactive({
      playlist: {}, //歌单详情
      songs: [], //所有歌曲
    })
    onMounted(async () => {
      // 推荐歌单详情
      let id = useRoute().query.id
      // console.log(id)
      let res = await getMusicList(id)
      // console.log(res)
      state.playlist = res.data.playlist

      // 获取歌单所有歌曲
      let result = await getMusicAllList(id)
      // console.log(result)
      state.songs = result.data.songs
    })
    return { state }
  },
  // provide() {
  //   return {
  //     songs: this.state.songs,
  //   }
  // },
  components: {
    Top,
    Bottom,
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 30px;
}
</style>
