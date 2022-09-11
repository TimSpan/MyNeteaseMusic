import Header from '@/components/header/header.vue';
<template>
  <div class="header">
    <van-icon name="service" />
    <h1>Z-J-M专属网抑云音乐</h1>
    <router-link class="mine" to="/login">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.header {
  height: 0.88rem;
  line-height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon {
    margin-right: 0.2rem;
    color: $color-theme;
    font-size: 0.32rem;
  }
  h1 {
    color: $color-theme;
    font-size: 0.32rem;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}

/* img {
  height: 0.88rem;
  
} */
</style>
