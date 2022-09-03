<template>
  <div class="index-list">
    <ul ref="groupRef">
      <li class="group">
        <ul>
          <li v-for="item in singerList" :key="item.id">
            <router-link
              class="item"
              :to="{
                path: '/singerSongs',
                query: { id: item.id, img: item.img1v1Url, name: item.name },
              }"
            >
              <van-image class="images" :src="item.img1v1Url" round>
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>

              <span class="name">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['singerList'],
}
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: $color-background;
  margin-bottom: 60px;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .images {
        width: 50px;
        height: 50px;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
}
</style>
