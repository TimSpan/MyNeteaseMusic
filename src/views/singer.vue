<template>
  <singerList :singerList="artists" @select="selectSinger" />
  <router-view :singer="selectSinger"></router-view>
</template>

<script>
import { getSinger } from '@/api/singer'
// import { reactive, onMounted } from 'vue'
import singerList from '@/components/base/singerList.vue'
export default {
  data() {
    return {
      artists: [], //所有歌手
      selectSinger: null,
    }
  },
  async created() {
    const res = await getSinger()
    this.artists = res.data.artists
  },
  methods: {
    selectSinger(singer) {
      this.selectSinger = singer
      this.$router.push({
        path: `/singer/${singer.id}`,
      })
    },
  },
  // setup() {
  //   const state = reactive({
  //     artists: [], //所有歌手
  //     selectSinger:[]
  //   })
  //   onMounted(async () => {
  //     let res = await getSinger()
  //     // console.log(res)
  //     state.artists = res.data.artists
  //   })
  //   function selectSinger(singer) {
  //     state.selectSinger = singer
  //     this.$router.push({
  //       path:`/singer/${singer.id}`
  //     })
  //   }
  //   return { state ,selectSinger}
  // },
  components: {
    singerList,
  },
}
</script>

<style lang="scss" scoped></style>
