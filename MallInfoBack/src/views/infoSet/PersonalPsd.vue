<template>
  <div class="container">
    <el-form :model="psdInfo" :rules="rules" ref="psdInfo">
      <el-form-item label="当前密码" prop="currentInfo">
        <el-input v-model="psdInfo.currentInfo" type="password" >
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newInfo">
        <el-input v-model="psdInfo.newInfo" type="password">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="reInfo">
        <el-input v-model="psdInfo.reInfo" type="password"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="default" @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {isPassword} from "@/utils/common";
    export default {
        name: "PersonalPsd",
      data(){
          var validatePass=(rule,value,callback)=>{
            if(value===''){
              callback(new Error('请输入密码'))
            }
            else if(!isPassword(value)){
              callback(new Error('密码格式不正确'))
            }
          else{
              if(this.psdInfo.newInfo!==''){
                this.$refs.psdInfo.validateField('reInfo');
              }
              callback();
            }

          };
          var validateNew=(rule,value,callback)=>{
            if(value===''){
              callback('请再次输入新密码')
            }
            else if(value!==this.psdInfo.newInfo){
              callback('两次输入密码不一致！')
            }
            else{
              callback();
            }
          };
          return{
            psdInfo:{
              currentInfo:'',
              newInfo:'',
              reInfo:''

            },
            rules:{
              currentInfo:[{required:true,trigger:'blur',message:'请输入当前密码'}],
              newInfo:[
                {required:true,trigger:'blur',message:'请输入新密码'},
               {validator:validatePass,trigger:'blur'}

              ],
              reInfo:[
                {required:true,trigger:'blur',message:'请再次输入新密码'},
                {validator:validateNew,trigger:'blur'}
              ]
            }
          }
      },
      methods:{
          save(){
            this.$refs.psdInfo.validate((valid)=>{
              if(valid){
                let mobile=this.$store.state.userInfo.mobile;
                let pwd=this.psdInfo.currentInfo;
                let conPwd=this.psdInfo.newInfo;
                 this.$ajax('UserInfoAdminApi/EditPwd','POST',{mobile:mobile,pwd:pwd,conPwd:conPwd}).then(res=>{
                   if(res.code===200){
                     this.$message({
                       message:'修改成功！',
                       type:'success'
                     })
                   }
                   else{
                     this.$message({
                       message:res.data.msg,
                       type:'error'
                     })
                   }
                 })

              }
              else{

                 return false;
              }
            })
          },
        cancel(){
            this.$refs.psdInfo.resetFields();
        }
      },
      mounted(){

      }

    }
</script>

<style scoped>
  .container{
    padding:3rem;
    width:20%;
  }
</style>
