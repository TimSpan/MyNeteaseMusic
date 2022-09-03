<template>
  <div>
    <Header v-show="!$route.meta.a"></Header>
    <Tab v-show="!$route.meta.a"></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <FooterMusic />
  </div>
</template>

<script>
import FooterMusic from '@/components/FooterMusic.vue'
import Header from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
export default {
  components: {
    Header,
    Tab,
    FooterMusic,
  },
}
</script>
