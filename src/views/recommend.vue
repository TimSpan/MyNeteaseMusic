<template>
  <div>
    <Swiper></Swiper>
    <HotSong></HotSong>
  </div>
</template>

<script>
import Swiper from './recommend/Swiper.vue'
import HotSong from './recommend/hotSong.vue'
export default {
  components: {
    Swiper,
    HotSong
  },
}
</script>

