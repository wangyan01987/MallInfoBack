<template>
 <div class="login-box">
   <div class="login-container">
     <p class="login-title">工程设备租赁平台（出租方）</p>
     <el-form :model="formData" ref="formData" :rules="rules" >
       <el-form-item prop="account" label="账号">
         <el-input type="text" v-model="formData.account" ></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="passWord">
         <el-input type="password" v-model="formData.passWord" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item>
         <div class="login-foot">
           <el-button type="primary" @click="submit('formData')">登录</el-button>
         </div>
       </el-form-item>
       <el-form-item class="go-rigister">
         <span @click="goRegister">立即注册>></span>
       </el-form-item>
     </el-form>
   </div>
   <register  ref="register">
   </register>
 </div>
</template>
<script>
  import register from "@/components/register"
  export default {
   data(){
     return {
      formData:{
        account:'111',
        passWord:'111111'
      },
       rules:{
         passWord:[{required:true,message:'请输入密码',trigger:'blur'}],
         account:[{required:true,message:'请输入账号',trigger:'blur'}],

       },
       isRegister:false
     }
   },
   components:{register},
    methods:{
     submit(formData){
      this.$refs[formData].validate((valid)=>{
        if(valid){
          this.$store.commit('changeLogin',true);
           this.$router.push({name:'home'})
        //    发送请求
        }else{
          return false;
        }
      })
     },
      goRegister(){
         this.$refs.register.dialogFormVisible=true;
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
  .login-title{
    font-size:1.5rem;
  }
  .go-rigister {
    text-align:right;

  }
  .go-rigister span{
    cursor:pointer;
  }


</style>
