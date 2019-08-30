<template>
<el-container>
  <el-aside width="210px">
    <el-scrollbar>
      <HomeMenu></HomeMenu>
    </el-scrollbar>
  </el-aside>
  <el-main>
    <el-header height="80px">
      <HomeHead></HomeHead>
    </el-header>

    <el-scrollbar ref="scrollbar" id="scrollBox">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home' }">管理</el-breadcrumb-item>
      </el-breadcrumb>
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
  #scrollBox{
    width:100%;
  }
   .el-breadcrumb{
     padding:1rem;
   }
</style>
