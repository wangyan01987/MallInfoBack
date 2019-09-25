<template>
  <div class="box">
    <div class="box-header">
      <p class="title"><i class="iconfont icon-gerenzhongxin1" style="font-size:1.3em"></i>个人资料</p>
    </div>
    <div class="box-body">
      <p class="title">基本信息</p>
      <el-form :model="connectList" :rules="rules" ref="connectList" label-width="100px"  class="baseInfo">
        <el-form-item label="头像">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              :action="baseApi+'OSSApi/UploadAvatarUrl'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="personInfo.Avatar" :src="personInfo.Avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item label="会员名">
          <span v-if="!isEdit">{{personInfo.Nickname===''?'未设置':personInfo.Nickname}}</span>
          <el-input  v-model="connectList.Nickname" v-else>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号">
            {{personInfo.Mobile}}
        </el-form-item>
        <el-form-item label="姓名">
          <span v-if="!isEdit">{{personInfo.RealName===''?'未设置':personInfo.RealName}}</span>
          <el-input  v-model="connectList.RealName" v-else></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <span v-if="!isEdit">{{personInfo.sex}}</span>
          <el-radio-group v-model="connectList.sex" v-else>
            <el-radio label="女"></el-radio>
            <el-radio label="男"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门">
          <span v-if="!isEdit">{{personInfo.branch}}</span>
          <el-input  v-model="connectList.branch" v-else></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <span v-if="!isEdit">{{personInfo.assign}}</span>
          <el-input  v-model="connectList.assign" v-else></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <span v-if="!isEdit">{{personInfo.Email===''?'未设置':personInfo.Email}}</span>
          <el-input  v-model="connectList.Email" v-else></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="QQ">
          <span v-if="!isEdit">{{personInfo.QQ===''?'未设置':personInfo.QQ}}</span>
          <el-input  v-model="connectList.QQ" v-else></el-input>
        </el-form-item>
        <el-form-item label="阿里旺旺" prop="ali">
          <span v-if="!isEdit">{{personInfo.ali==''?'未设置':personInfo.ali}}</span>
          <el-input  v-model="connectList.ali" v-else></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="weixin">
          <span v-if="!isEdit">{{personInfo.weixin==''?'未设置':personInfo.weixin}}</span>
          <el-input  v-model="connectList.weixin" v-else></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isEdit=true" v-if="!isEdit">
            编辑
          </el-button>
          <div v-if="isEdit">
            <el-button type="default" @click="cancel">
              取消
            </el-button>
            <el-button type="primary" @click="save">
              保存
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>

<script>
  import {email} from "@/utils/common";

  import api from "@/api/ajax.js";
  // import Cookies from 'js-cookie';
  export default {
    name: "index",

    data:function(){
      var emailValidator=(rule,value,callback)=>{
        if(value.length!==0){
          if(!email(value)){
            callback(new Error('邮箱格式不正确'));
          }
          else{
            callback();
          }
        }
        else{
          callback();
        }

      };

      return {
        align:'center',
        baseApi:process.env.Base_URL,
        personInfo:{
          Avatar:'',
          isAuthen:'',
          Mobile:'1563524389'
        },
        msg:'',
        connectList:{
          Email:''
        },
        isEdit:false,
        rules:{
          Email: [{validator:emailValidator,trigger:'blur'}]
        },
        gridData:[]
      }
    },

    mounted(){
      //
       var mobile=this.$store.state.userInfo.Mobile;
      api('PersonalCenterApi/DeveloperUserByMobile','POST',{Mobile:mobile}).then(res=>{
        if(res.code==='000000'){
          this.personInfo=res.data;
          var gender=this.personInfo.Gender;
          if(gender==='M'){
            this.personInfo.sex='女'
          }
          else if(gender==='F'){
            this.personInfo.sex='男';
          }
          let {Mobile,Nickname,Email,Gender,sex,RealName}=this.personInfo;
          this.connectList={Mobile,Nickname,Email,Gender,sex,RealName};
        }

      });

    },
    computed:{
    },
    methods:{
      stateChange(val){
        this.personInfo.IsNoAuthentication=val;
      },
      gotoAuthen(){
        this.$refs.authen.dialogVisible=true;
      },
      save(){
        this.$refs.connectList.validate((valid)=>{
          if(valid){
            //发送保存信息
            this.personInfo.sex=this.connectList.sex;
            switch (this.connectList.sex){
              case'女':this.connectList.Gender='M';break;
              case'男':this.connectList.Gender='F';break;
            }
            delete   this.connectList.sex;
            // api('PersonalCenterApi/EditDeveloperUserBaseInfo','POST',this.connectList).then(res=>{
            //   if(res.code==='000000'){
            //     this.$message({
            //       type:'success',
            //       message:res.msg
            //     });
            //     this.personInfo.Nickname= this.connectList.Nickname;
            //     this.personInfo.Email=this.connectList.Email;
            //     this.personInfo.Gender= this.connectList.Gender;
            //     this.personInfo.RealName=this.connectList.RealName;
            //     this.$store.commit('getUserInfo',this.personInfo);
            //     Cookies.set('userInfo',JSON.stringify(this.personInfo),{expires: 7})
            //     this.isEdit=false;
            //   }
            //   else{
            //     this.$message({
            //       type:'error',
            //       message:res.msg
            //     });
            //     return false;
            //   }
            // });
          }
          else{
            return false;
          }
        });
      },
      cancel(){
        this.isEdit=false;
      },
      handleAvatarSuccess(res, file) {

        if(res.code===200){
          this.personInfo.Avatar=res.data;

        }
        else{
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG /JPEG/PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .box{
    padding: 20px  30px;
    height:100%;
    box-sizing: border-box;
  }
  .box-body{
    padding:20px;
    border:1px solid #eee;
  }
  .box .el-form{
    width:80%;
    display:flex;
    flex-wrap:wrap;
    padding:0 30px;
    box-sizing: border-box;
  }
  .box .el-form-item{
    width:50%;
    padding-right:50px;
    box-sizing: border-box;

  }


</style>
