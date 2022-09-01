<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerSongs } from '@/api/singer'
import { reactive, onMounted } from 'vue'
export default {
  props: {
    singer: Object,
  },
  setup() {
    const state = reactive({
      SingerSongs: [], //歌手的所有歌曲
    })
    onMounted(async () => {
      let res = await getSingerSongs()
      // console.log(res)
      state.SingerSongs = Songs.data.songs
    })
    return { state }
  },
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
