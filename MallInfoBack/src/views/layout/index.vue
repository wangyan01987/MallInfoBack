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

    <el-scrollbar ref="scrollbar" id="scrollBox" >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item   v-for="item in breadList" :key="item.meta.name" :to="{ path: item.path }">{{item.meta.name}}</el-breadcrumb-item>
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
         },
      data(){
           return{
              breadList:[{meta:{name:'首页'},path:'/home'}]
           }
      },
      watch:{
           '$route':function(newVal,oldVal){
             this.breadList=[];
             var  len=newVal.matched.length;
               var  currentPath=newVal.matched[len-1];
               if( currentPath.parent.name!==undefined){
                     this.breadList.push(currentPath.parent)
               }
               this.breadList.push(currentPath)
           }
      },
      mounted(){
             var h=window.innerHeight-82+'px';
             document.getElementById('scrollBox').style.height=h;
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
