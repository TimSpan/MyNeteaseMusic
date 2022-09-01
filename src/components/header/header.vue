import Header from '@/components/header/header.vue';
<template>
  <div class="header">
    <h1>网易云音乐</h1>
    <!-- <img src="./wangyiyun.jpg" alt="" /> -->
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
  h1 {
    color: $color-theme;
    font-size: 0.32rem;
  }
}

/* img {
  height: 0.88rem;
  
} */
</style>
