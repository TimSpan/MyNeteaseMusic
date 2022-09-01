<template>
  <div class="index-list">
    <ul ref="groupRef">
      <li class="group">
        <!-- <h2 class="title">{{ group.title }}</h2> -->
        <ul>
          <li
            v-for="item in singerList"
            :key="item.id"
            class="item"
            @click="onItemClick(item)"
          >
            <!-- 歌手头像 -->
            <img class="avatar" :src="item.img1v1Url" />
            <!-- 歌手名字 -->
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['singerList'],
  emits: ['select'],
  setup(props, { emit }) {
    function onItemClick(item) {
      emit('select', item)
    }
    return { onItemClick }
  },
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
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        // background-size: cover;
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
