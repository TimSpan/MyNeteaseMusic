<template>
  <div>
    <keep-alive>
      <Swiper></Swiper>
    </keep-alive>
    <keep-alive>
      <HotSong></HotSong>
    </keep-alive>
  </div>
</template>

<script>
import Swiper from './recommend/Swiper.vue'
import HotSong from './recommend/hotSong.vue'
export default {
  components: {
    Swiper,
    HotSong,
  },
}
</script>
