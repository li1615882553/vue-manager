<template>
  <h1>
    <Icon icon-class="dayin"></Icon>
    This is admin module's hello! 
    <el-button @click="getCategoryList">按钮</el-button>
  </h1>
</template>
<script>
import api from '../../api/category'
export default {
  name: "Hello",
  data(){
    return {
      catagoryList:[]
    }
  },
  methods:{
    getCategoryList() {
      api.categroyList().then(res => {
        this.catagoryList = res.recordList
      }).catch(err => {
        console.log(err.selfCancel)
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>