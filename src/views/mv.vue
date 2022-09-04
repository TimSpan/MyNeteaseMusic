<template>
  <div>
    <h1>mv</h1>
  </div>
</template>

<script>
import { getMV } from '@/api/mv'
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(async () => {
      let res = await getMV()
      console.log(res)
    })
  },
}
</script>

<style lang="scss" scoped></style>
