<template>
    <div class="header-container">
     <div class="head-title">
       <img :src="headImg" />
       <span class="title">
         {{title}}
       </span>
     </div>
      <div class="login-out">
        <i class="iconfont">
        </i>
        <span @click="loginOut()">退出</span>
      </div>
      <div class="person-info">
        <el-avatar :size="50" :src="personInfo.avatar"></el-avatar>
        <span>欢迎您，{{personInfo.name}}</span>
      </div>

    </div>
</template>

<script>
    export default {
        name: "index",
      data:function(){
          return{
            title:'工程设备租赁平台（出租方）',
            headImg:'',
            personInfo:{
              avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              name:'北雁南飞'
            }
          }
      },
      methods:{
          loginOut(){
              this.$store.commit('changeLogin',false);
              this.$router.push('/login');
              }
    }
    }
</script>

<style scoped>
   .header-container{
     height:100%;
     line-height:80px;
   }
  .head-title{
    float:left;
  }
  .person-info{
    float:right;
    margin-right:2rem;
  }
  .login-out{
    float:right;
  }
  .title{
    font-size:1.5rem;
  }
  .person-info{
    display: flex;
    align-items:center;
  }
  .login-out{
    cursor: pointer;
  }
</style>
