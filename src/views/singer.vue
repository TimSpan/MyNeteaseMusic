<template>
  <keep-alive>
    <singerList :singerList="artists" />
  </keep-alive>

  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import { getSinger } from '@/api/singer'
// import { reactive, onMounted } from 'vue'
import singerList from '@/components/singer/singerList.vue'
export default {
  data() {
    return {
      artists: [], //所有歌手
    }
  },
  async created() {
    const res = await getSinger()
    this.artists = res.data.artists
  },
  components: {
    singerList,
  },
}
</script>

<style lang="scss" scoped></style>
