<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in state.musicList" class="item" :key="item.id">
            <!-- 路由跳转 *********************-->
            <router-link
              class="item"
              :to="{ path: '/hotSongMusic', query: { id: item.id } }"
            >
              <div class="icon">
                <van-image class="images" :src="item.picUrl" width="60" height="60">
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
          

                <!-- <img width="60" height="60"  :src="item.picUrl" /> -->
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.name }}
                </h2>
                <p class="title">
                  {{ item.name }}
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/api/recommend'
import { reactive, onMounted } from 'vue'
// import { useRoute } from 'vue-router';
export default {
  setup() {
    const state = reactive({
      musicList: [],
    })
    onMounted(async () => {
      let res = await getMusicList()
      // console.log(res)
      state.musicList = res.data.result
    })
    return { state }
  },
}
</script>

<style lang="scss" scoped>
.recommend {
  position: relative;
  width: 100%;
  overflow: scroll;
  margin-bottom: 30px;

  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 0 0.4rem 0.1rem;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
          .images{
            background-size: cover;
          }
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
