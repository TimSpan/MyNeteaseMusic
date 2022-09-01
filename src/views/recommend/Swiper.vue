<template>
  <div class="swiperTop">
    <van-swipe :autoplay="1500" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from '@/api/recommend'
import { reactive, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      images: [],
    })
    onMounted(async () => {
      let res = await getBanner()
      // console.log(res)
      state.images = res.data.banners
      // axios.get('https://wangyiyun-api-six.vercel.app/banner?type=2').then((res) => {
      // })
    })
    return { state }
  },
}
</script>

<style lang="scss">
.swiperTop {
  position: relative;
  // bottom: 60px;
  padding-top: 0.1rem;
  .van-swipe {
    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
