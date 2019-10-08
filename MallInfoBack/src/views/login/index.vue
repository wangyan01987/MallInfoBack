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
       <el-form-item class="psdAct">
           <el-checkbox label="十天内免登录"  v-model="formData.autoLogin"></el-checkbox>
           <span @click="goRegister('002')" >忘记密码?</span>
       </el-form-item>
       <el-form-item>
         <div class="login-foot">
           <el-button type="primary" @click="submit('formData')">登录</el-button>
         </div>
       </el-form-item>
       <el-form-item class="go-rigister">
         <span @click="goRegister('001')">立即注册>></span>
       </el-form-item>
     </el-form>
   </div>
   <register  ref="register" :registerType="registerType">
   </register>
 </div>
</template>
<script>
  import register from "@/components/register";
  import $ajax from "@/api/ajax.js"
  import Cookies from 'js-cookie'
  export default {
   data(){
     return {
      formData:{
        account:'15652729797',
        passWord:'abc123',
        isRegister:false
      },
       rules:{
         passWord:[{required:true,message:'请输入密码',trigger:'blur'}],
         account:[{required:true,message:'请输入账号',trigger:'blur'}],

       },
       registerType:''

     }
   },
   components:{register},
    methods:{
     submit(formData){
       var loginInfo={};
       loginInfo.userAccount=this.formData.account;
       loginInfo.userCode=this.formData.passWord;
       loginInfo.loginType=1;
      this.$refs[formData].validate((valid)=>{
        if(valid){
          $ajax('/UserInfoApi/Login',"POST",loginInfo).then(res=>{
           if(res.code===200){

             this.$store.commit('changeLogin',true);
             this.$router.push({name:'home'});
             this.$message({
               message: '登录成功',
               type: 'success'
             });
             //保存用户id信息
             this.$store.commit('setUserId',res.data.id);
             this.$store.commit('setisVIP',res.data.isVIP);
             this.$store.commit('setUserInfo',res.data);
             if(this.formData.autoLogin){
                Cookies.set('userInfo',JSON.stringify(loginInfo),{expires:10,path:''});
               Cookies.set("isLogin", true, { expires: 10 });
               document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
                }
                else{
                 // 不设置期限，关闭浏览器。cookie就清除，和session 类似
               Cookies.set('userInfo',JSON.stringify(loginInfo));
               Cookies.set("isLogin", true);
                }
              }
              else{
             this.$message({
               message:res.msg,
               type:'error'
             })

           }
          })
        //    发送请求
        }else{
          return false;
        }
      })
     },
      goRegister(code){
         this.registerType=code;
         this.$refs.register.dialogFormVisible=true;

         }
    },
    mounted(){
  let userInfo=Cookies.get('userInfo');
               if(userInfo){
                userInfo= JSON.parse(userInfo)
                 $ajax('/UserInfoApi/Login',"POST",userInfo).then(res=>{
                   if(res.code===200){
                     this.$store.commit('changeLogin',true);
                     this.$router.push({name:'home'});
                     this.$store.commit('setUserId',res.data.id);
                     this.$store.commit('setisVIP',res.data.isVIP);
                     this.$store.commit('setUserInfo',res.data);
                   }
                 })
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
  .go-rigister,.psdAct{
    text-align:right;

  }
  .go-rigister span,.psdAct span{
    cursor:pointer;

  }

  .el-checkbox{
    color:#fff;
    float:left;
  }


</style>
