<template>
  <div class="box">
    <div class="box-header">
      <p class="title"><i class="iconfont icon-gerenzhongxin1" style="font-size:1.3em"></i>个人资料</p>
    </div>
    <div class="box-body">
      <p class="title">基本信息</p>
      <el-form :model="connectList" :rules="rules" ref="connectList" label-width="100px"  class="baseInfo">
        <el-form-item label="头像">
          <img v-if="personInfo.avatarUrl" :src="personInfo.avatarUrl" class="avatar">
            <el-upload
               v-else
              ref="upload"
              class="avatar-uploader"
              :action="baseApi+'OSSApi/UploadAvatarUrl'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="personInfo.avatarUrl" :src="personInfo.avatarUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="手机号">
            {{mobile}}
        </el-form-item>
        <el-form-item label="会员名">
          <span v-if="!isEdit">{{personInfo.nickname===undefined?'未设置':personInfo.nickname}}</span>
          <el-input  v-model="connectList.nickname" v-else></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <span v-if="!isEdit">{{gender===undefined?'未设置':gender}}</span>
          <el-radio-group v-model="gender" v-else>
            <el-radio label="女"></el-radio>
            <el-radio label="男"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门">
          <span v-if="!isEdit">{{!personInfo.department?'未设置':personInfo.department}}</span>
          <el-input  v-model="connectList.department" v-else></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <span v-if="!isEdit">{{!personInfo.position?'未设置':personInfo.position}}</span>
          <el-input  v-model="connectList.position" v-else></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <span v-if="!isEdit">{{!personInfo.email?'未设置':personInfo.email}}</span>
          <el-input  v-model="connectList.email" v-else></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <span v-if="!isEdit">{{!personInfo.qq?'未设置':personInfo.qq}}</span>
          <el-input  v-model="connectList.qq" v-else></el-input>
        </el-form-item>
        <el-form-item label="阿里旺旺" prop="alitalk">
          <span v-if="!isEdit">{{!personInfo.alitalk?'未设置':personInfo.alitalk}}</span>
          <el-input  v-model="connectList.alitalk" v-else></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <span v-if="!isEdit">{{!personInfo.wechat?'未设置':personInfo.wechat}}</span>
          <el-input  v-model="connectList.wechat" v-else></el-input>
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
        if(value){
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
        personInfo:{
          email:'',
          nickname:'',
          gender:0,
          department:'',
          position:'',
          qq:'',
          alitalk:'',
          wechat:''
        },
        align:'center',
        baseApi:process.env.Base_URL,
        msg:'',
        connectList:{

        },
        isEdit:false,
        rules:{
          email: [{validator:emailValidator,trigger:'blur'}]
        },
        gridData:[],
      }
    },


    mounted(){
      let userId=this.$store.state.userId;
    this.$ajax('UserInfoAdminApi/GetUBiase','GET',{uid:userId}).then(res=>{
      if(res.code===200){
        this.personInfo=res.data;
        this.connectList=res.data;
      }
    })


    },
    computed:{
      mobile(){
        return this.$store.state.userInfo.mobile;
      },
      gender:{
        get(){
          switch (this.connectList.gender){
            case 1:return '男';
            case 2:return '女';
            case 0:return '';
          }
        },
        set(val){

          switch (val){
            case '男':this.connectList.gender=1;break;
            case '女':this.connectList.gender=2;break;
            case'':this.connectList.gender=0;break;
          }
  }

      }

    },
    methods:{

      save(){

        this.$refs.connectList.validate((valid)=>{

            //发送保存信息
            let obj=Object.assign({},this.connectList);

            obj.userId=this.$store.state.userId;
            obj.mobile=this.mobile;
            delete obj.createTime;
            delete obj.id;
            delete obj.nickname;
            Object.keys(obj).forEach(function(item,index){
                if(obj[item]===''||obj[item]===null){
                  delete obj[item];
                }
            });
          if(valid){
               this.$ajax('UserInfoAdminApi/EditInfo','POST',obj).then(res=>{
                 if(res.code===200){
                     this.$message({
                       message:'编辑成功',
                       type:'success'
                     });
                     this.isEdit=false;
                     this.personInfo=this.connectList;
                     if(this.personInfo.nickname){
                       this.$store.state.userInfo.nickname=this.personInfo.nickname;
                     };
                     if(this.personInfo.avatarUrl){
                       this.$store.state.userInfo.avatarUrl=this.personInfo.avatarUrl;
                     }

                 }
                 else{
                      this.$message({
                        message:res.msg,
                        type:'error'
                      })
                 }
               })
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
          this.personInfo.avatarUrl=res.data;
          this.connectList.avatarUrl=res.data;

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
