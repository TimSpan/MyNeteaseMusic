<template>
  <div class="container">
    <SingerTop
      :singerTopSongs="state.singerTopSongs"
      :img="state.img"
      :name="state.name"
    />
    <SingerBottom :songs="state.singerTopSongs"  />
  </div>
</template>

<script>
import SingerTop from './singerTop.vue'
import SingerBottom from './singerBottom.vue'
import { getSingerSongs } from '@/api/singer'

// 使用useRoute 拿到路由跳转传过去的 歌手id，然后用这个id 获取歌手热门歌曲
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'

export default {
  name: 'SingerSongsList',
  components: {
    SingerTop,
    SingerBottom,
  },
  setup() {
    const state = reactive({
      singerTopSongs: [], //歌手的热门歌曲
      img: '',
      name: '',
    })
    onMounted(async () => {
      // 拿到歌手id
      let singerId = useRoute().query.id
      // console.log(singerId)
      let img = useRoute().query.img
      let name = useRoute().query.name
      // console.log(img);
      state.img = img
      state.name = name
      // console.log(useRoute());
      // 通过打印可以看到 id 储存在 query 的value 的id这里 。这个value是作为query 的一个属性存在

      // 获取歌手热门歌曲
      let res = await getSingerSongs(singerId)
      // console.log(res)

      state.singerTopSongs = res.data.songs
    })
    return { state }
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 30px;
}
</style>
