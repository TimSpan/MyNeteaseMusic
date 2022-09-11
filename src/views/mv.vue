<template>
  <div>
    <div class="mv"  v-for="(item,index) in state.mv" :key="index">
      <video 
        controls
        
        :src="item.url"
      ></video>
      <p class="name">{{item.name  }} </p>  
      <span class="ar-name">{{item.artistName}}</span>
    </div>
  </div>
</template>

<script>
import { getMV, getMVurl } from '@/api/mv'
import { onMounted, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      mv: [],
      id: [],
    })
    onMounted(async () => {
      //推荐mv
      let res = await getMV()
      // console.log(res)
      // console.log(state.mv);
      state.mv = res.data.result
      state.mv.forEach( async (item,index) => { //构造数据
        // state.id.push(item.id)
        let id = item.id
        // console.log(id);
        let mvURL = await getMVurl(id)
        // let mvDetail = await getMVDetail(id)
        // console.log(mvDetail);
        // console.log(mvURL)
        // state.mv[index].singerName= mvDetail.data.data.artists[0].name
        state.mv[index].url= mvURL.data.data.url
      })
      //mv 播放地址
      
      
    })
    return { state }
  },
}
</script>

<style lang="scss" scoped>
.mv {
  position: relative;
  width: 90%;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 0.1rem;
  // margin-bottom: 1.2rem;
  .name{
    display: inline-block;
  }
  .ar-name{
    padding-left: 0.6rem;
  }

  video {
    width: 100%;
    height: 4rem;
    // margin-top: 0.2rem;
  }
  
  
}
.mv:last-child{
  margin-bottom: 2rem;
}
</style>
