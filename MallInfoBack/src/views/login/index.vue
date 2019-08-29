<template>
 <div class="login-box">
   <div class="login-container">
     <p>工程设备租赁平台（出租方）</p>
     <el-form :model="formData" ref="formData" >
       <el-form-item prop="account" label="账号">
         <el-input type="text" v-model="formData.account" ></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="pass">
         <el-input type="password" v-model="formData.Password" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item>
         <div class="login-foot">
           <el-button type="primary" @click="submit(formData)">登录</el-button>
         </div>
       </el-form-item>
     </el-form>
   </div>
 </div>
</template>
<script>
  export default {
   data(){
     return {
      formData:{
        account:'111',
        Password:'111111'
      }
     }
   },
    methods:{
     submit(){

     }
    }
  }
  </script>
<style scoped>
  .login-container{

    width:30rem;
    margin:0 auto;
    padding-top:10rem;
    text-align:center;
    color:#fff;
  }
  .login-foot{
    text-align: center;
  }
  .el-button{
    width:100%;
  }
  .login-box{
    width:100%;
    height:100%;
    background-color:#304156;
  }

</style>
