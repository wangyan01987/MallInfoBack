<template>
  <!--登录弹窗-->
  <el-dialog :title="msg.title" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" width="500px"
             :close-on-click-modal="false" @close="closeDia">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="手机号" prop="mobile">
        <el-input type="text" v-model="ruleForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input type="text" v-model="ruleForm.code" autocomplete="off" class="register-code"></el-input>
        <el-button class="get-code" :type="type" @click="getCode" :disabled="isDisabled">{{codeTxt}}</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-tooltip class="item" effect="dark" content="密码为6-16位英文大小写、数字、“_”任意两种组合" placement="top-end">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="isAgree">
       <el-checkbox label="同意" name="isAgree" v-model="ruleForm.isAgree"></el-checkbox>
        <a href="/static/agreement.html" target="_blank" style="text-decoration: none;color:cornflowerblue;">用户协议条款</a>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">完 成</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {isOnlyMobile, isPassword} from "@/utils/common";
  import  apiRequest from '../../api/ajax.js'
  //import ajax from "../../api/request.js"


  const defaultQuery = {
    pass: '',
    checkPass: '',
    code: '',
    mobile: '15652729797',
    isAgree: ''
  };
  export default {
    name: "register",
    props: {
      'registerType': {
        type: String,
        default: '001'
      }
    },
    data() {
      let validateMobile = async (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!isOnlyMobile(value)) {
             callback(new Error('手机号码格式不正确'))
          } else {
            callback();
          }
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (isPassword(value)) {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          } else {
            callback('6-16位英文大小写、数字、“-”任意两种组合');
          }
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        type: 'primary',
        isDisabled: false,
        arr:{
             name:123,
          age:12
          },
        ruleForm: {
          pass: '',
          checkPass: '',
          code: '',
          mobile: '',
          isAgree: false
        },
        isAgree: false,
        rules: {
          mobile: [
            {validator: validateMobile, required: true, trigger: 'blur'}
          ],
          code: [
            {required: true, trigger: 'blur', message: '请输入验证码'},
            {min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, required: true, trigger: 'blur'}
          ],
          isAgree: [{required: true, trigger: 'change', message: '请阅读并同意相关服务条款'}]
        },
        formLabelWidth: '80px',
        dialogFormVisible: false,
        isR: false,
        codeTxt: '获取验证码',
        msg: {},
        msg1: {
          title: '注册账号',
          password: '密码'
        },
        msg2: {
          title: '忘记密码',
          password: '新密码密码'
        }
      }
    },
    watch: {
      registerType(val) {
        if (val === '001') {
          this.msg = this.msg1;
        } else {
          this.msg = this.msg2;
        }
      },
      dialogFormVisible() {
        this.ruleForm = JSON.parse(JSON.stringify(defaultQuery));
        this.initData()
      },
      arr:{
        handler(newVal,oldVal){
          console.log(newVal)

        },
        deep:true,
        immediate:true
      }
    },
    mounted() {


    },
    methods: {
      submitForm(formName) {
        let obj = {};

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = 'UserInfoApi/Registered';
            //忘记密码接口
            if (this.registerType !== '001') {
              let oData = this.ruleForm;
              url = 'UserInfoApi/ResetPassword';
              obj={};
              obj.mobile=oData.mobile;
              obj.password=oData.pass;
              obj.code=oData.code;
            }
            else{
              let oData = this.ruleForm;
              obj.userPassword = oData.pass;
              obj.userAccount = oData.mobile;
              obj.userCode = oData.code;
              obj.regType='1';
              obj.userType='2';
              obj.appCode='com.zhongzhudata.zhongzhu';
            };
            apiRequest(url, 'POST', obj).then(res => {
              if (res.code === 200) {
                this.dialogFormVisible = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async getCode() {
        let type='';
        if (this.ruleForm.mobile == '' || !isOnlyMobile(this.ruleForm.mobile)) {
          this.$refs.ruleForm.validateField('mobile');
          return;
        }
        if(this.registerType==='001'){
  //注册
          type='2'

        }else{
          type='4'
          // let isR = await this.checkPhone(this.ruleForm.mobile);
          // if (isR.code !== '000000') {
          //   return;
          // }

        }
        apiRequest('UserInfoApi/SmsSendCodeByType', 'POST', { "phone": this.ruleForm.mobile,"type": type}).then(res => {
          if (res.code === '200') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        });

        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.codeTxt = `剩余${this.count}s`;
              this.isDisabled = true;
              this.type = 'default';
            } else {
              this.initData()
            }
          }, 1000)
        }
      },
      initData() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.codeTxt = '获取验证码';
        this.isDisabled = false;
        this.type = 'primary';
      },
      closeDia() {
        this.$refs['ruleForm'].resetFields();
        // this.ruleForm = defaultQuery;
        // this.initData()
      },
      checkPhone(value) {
        let type = '2';
        if (this.registerType != 'registerType') {
          type = '3';
        }
        return new Promise((resolve, reject) => {
          apiRequest('AdminLogin/ValidPhone', 'POST', {Mobile: value, Type: type}).then(res => {
            resolve(res)
          }).catch(res => {
            reject(res)
          })
        })
      }
    }
  }
</script>

<style scoped>
  .ruleForm .el-input {
    width: 90%;
  }

  .ruleForm .register-code {
    width: 192px;
  }

  .get-code {
    margin-left: 15px;
    width: 112px;
    text-align: center;
  }

  .user-agreement {
    text-decoration: none;
    color: #409EFF;
  }
</style>
