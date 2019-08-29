<template>
<el-container>
<el-header height="80px">
  <HomeHead></HomeHead>
</el-header>
  <el-main>
    <el-aside width="210px">
      <el-scrollbar>
      <HomeMenu></HomeMenu>
      </el-scrollbar>
    </el-aside>
    <el-scrollbar ref="scrollbar" id="scrollBox">
      <router-view></router-view>
    </el-scrollbar>
  </el-main>
</el-container>
</template>

<script>
  import HomeMenu from"@/components/HomeMenu"
  import HomeHead from "@/components/Header"
    export default {
        name: "layout11",
      components:{
         HomeMenu,
        HomeHead
      }
    }
</script>

<style scoped>
   .el-header{
     background-color:#eee;
   }
  .el-aside{
    background-color:#304156;
    height:100%;
  }
</style>
