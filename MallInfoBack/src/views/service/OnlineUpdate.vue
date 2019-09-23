<template>
<div class="container">
<div style="text-align:right">
  <el-button v-if="isPay" @click="goBack" >返回</el-button>
</div>
  <pay v-if="isPay"></pay>
  <el-form :model="formData" label-width="180px" :rules="rules" ref="formData" class="form" v-else>
    <el-form-item label="升级为" v-if="!isVIP">
      <span  class="red" >
        VIP会员
      </span>
      <span >
        您当前的会员组为企业会员
      </span>
    </el-form-item>
    <el-form-item label="您已为VIP" v-if="isVIP">
    </el-form-item>
    <el-form-item label="所需费用">
      2000元/年
    </el-form-item>
    <el-form-item label="公司全称" prop="comName">
      <el-input type="" placeholder="请输入公司名称" v-model="formData.comName" disabled>
      </el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="contacts">
      <el-input placeholder="请输入联系人" v-model="formData.contacts" disabled>
      </el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="phone" >
   <el-input placeholder="请输入电话号码" v-model="formData.phone" disabled></el-input>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="formData.mobile" ></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="formData.QQ"></el-input>
    </el-form-item>
    <el-form-item label="阿里旺旺">
      <el-input v-model="formData.aliTalk"></el-input>
    </el-form-item>
    <el-form-item label="微信">
      <el-input v-model="formData.weChat"></el-input>
    </el-form-item>
    <el-form-item label="附言">
      <el-input type="textarea" v-model="formData.remark"></el-input>
    </el-form-item>
    <el-form-item v-if="!isVIP">
      <el-button type="primary" @click="submitInfo('formData')">
        确认开通
      </el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
  import $ajax from  '@/api/ajax.js'
  import pay from '@/components/PayMents'
    export default {
        name: "OnlineUpdate",
      data:function(){

          return{

            formData:{

            },
            isPay:false,

            rules:{
              comName:[
                {required:true,message:'请输入公司全称',trigger:'blur'}
              ],
              contacts:[
                {required:true,message:'请输入联系人姓名',trigger:'blur'}
              ],
              phone:[
                {required:true,message:'请输入电话',trigger:'blur'}
              ]
            }
          }
        },
      computed:{
           isVIP(){
             return this.$store.state.isVIP;
           }
      },
      components:{pay},
      methods:{
          submitInfo(formData){

             this.$refs[formData].validate((valid)=>{
               if(valid){
                 //发送数据
                 var obj={};
                 obj.vipTypeId=1;
                 obj.userId=this.$store.state.userId;
                 obj.companyId=this.$store.state.comId;
                 obj.contact=this.formData.contacts;
                 obj.phone=this.formData.phone;
                 obj.mobile=this.formData.mobile;
                 obj.email=this.formData.email;
                 obj.qq=this.formData.qq;
                 obj.aliTalk=this.formData.aliTalk;
                 obj.weChat=this.formData.weChat;
                 obj.remark=this.formData.remark;

                 $ajax('UOpenVApi/OpenVIP','POST',obj).then(res=>{
                   if(res.code===200){
                     this.$message({
                       message:'提交成功',
                       type:'success'
                     });
                     this.isPay=true;
                   }

                 });


               }else{
                 return false;
               }
             })
          },
        goBack(){
            this.isPay=false;
        }
      },
      mounted(){
          let uid=this.$store.state.userId;
          let comid=this.$store.state.comId;

          $ajax('UOpenVApi/GetComContact','GET',{uid:uid,comid:comid}).then(res=>{
           this.formData=res.data;
           //保存会员类型
           this.$store.commit('setvipTypeId',1);
          })
      }
      }

</script>

<style scoped>
.red{
  color:red;
}
  .container{
    padding:2rem;
  }
  .form{
    width:50%;
  }
</style>
