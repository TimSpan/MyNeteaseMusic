import Header from '@/components/header/header.vue';
<template>
  <div class="header">
    <van-icon name="service" />
    <h1>Z-J-M专属网抑云音乐</h1>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss" scoped>
.header {
  height: 0.88rem;
  line-height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon{
    margin-right: 0.2rem;
    color: $color-theme;
    font-size: 0.32rem;
  }
  h1 {
    color: $color-theme;
    font-size: 0.32rem;
  }
}

/* img {
  height: 0.88rem;
  
} */
</style>
