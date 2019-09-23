<template>
<div class="container">
  <p>公司联系方式</p>
  <el-form label-width="180px" ref="formData" :model="formData" :rules="rules">
    <el-form-item label="公司地址" prop="address">
      <el-input v-model="formData.address"></el-input>
    </el-form-item>
    <el-form-item label="公司电话" prop="phone">
      <el-input v-model="formData.phone"></el-input>
    </el-form-item>
    <el-form-item label="微信" prop="weChat">
      <el-input v-model="formData.weChat">
      </el-input>
    </el-form-item>
    <el-form-item label="QQ" prop="QQ">
      <el-input v-model="formData.QQ">
      </el-input>
    </el-form-item>

    <el-form-item label="阿里旺旺" prop="ali">
      <el-input v-model="formData.ali">
      </el-input>
    </el-form-item>
    <el-form-item label="公司传真" prop="fax">
      <el-input v-model="formData.fax"></el-input>
    </el-form-item>
    <el-form-item label="公司Email" prop="Email">
      <el-input v-model="formData.Email">
      </el-input>
    </el-form-item>
    <el-form-item label="公司网站" prop="website">
      <el-input v-model="formData.website"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save()">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import {isPhone} from "@/utils/common.js";
    export default {
        name: "CompanyConnect",
      data(){
          var validPhone=(rule,value,callback)=>{
             if(value===''){
               callback(new Error('请输入公司电话'));
             }
             else if(!isPhone(value)){
               callback(new Error('电话号码格式不正确'));
             }
             else{
               callback();
             }
          };
          return{
             formData:{
                   phone:''
                },
            rules:{
               address:[{required:true,trigger:'blur',message:'请输入公司地址'}],
              phone:[{validator:validPhone,trigger:'blur'},
                {required:true,trigger:'blur',message:'请输入公司电话'}],
              weChat:[{required:true,trigger:'blur',message:'请输入微信号'}]
            }
          }
      },
      methods:{
          save(){
            this.$refs.formData.validate(valid=>{
              if(valid){
                this.$message({
                  message:'保存成功',
                  type:'success'
                });
                //发送信息
              }else{
                return false;
              }
            })
          },
        cancel(){
            this.$refs.formData.resetFields();
        }
      }
    }
</script>

<style scoped>
 .container{
    width:50%;
   padding: 1rem;
 }
</style>
