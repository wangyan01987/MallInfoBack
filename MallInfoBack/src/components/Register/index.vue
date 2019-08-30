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

  const defaultQuery = {
    pass: '',
    checkPass: '',
    code: '',
    mobile: '',
    isAgree: ''
  };
  export default {
    name: "register",
    props: {

    },
    data() {
      let validateMobile = async (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (isOnlyMobile(value)) {
            let isR = await this.checkPhone(value);
            if (isR.code != '000000') {
              callback(new Error(isR.msg));
            } else {
              callback();
            }
          } else {
            callback('请输入11位手机号码');
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
        ruleForm: {
          pass: '',
          checkPass: '',
          code: '',
          mobile: '',
          isAgree: ''
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

      dialogFormVisible() {
        this.ruleForm = JSON.parse(JSON.stringify(defaultQuery));
        this.initData()
      }
    },
    mounted() {

    },
    methods: {
      submitForm(formName) {
        let obj = {};
        let oData = this.ruleForm;
        obj.Password = oData.pass;
        obj.Mobile = oData.mobile;
        obj.Code = oData.code;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = 'AdminLogin/Adduser';
            if (this.registerType !== 'registerType') {
              url = 'AdminLogin/ForgetPassword'
            }
            apiRequest(url, 'POST', obj).then(res => {
              if (res.code == '000000') {
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
        if (this.ruleForm.mobile == '' || !isOnlyMobile(this.ruleForm.mobile)) {
          this.$refs.ruleForm.validateField('mobile');
          return;
        }
        let isR = await this.checkPhone(this.ruleForm.mobile);
        if (isR.code != '000000') {
          return;
        }
        //发送验证码
        let type = '2';
        if (this.registerType != 'registerType') {
          type = '3';
        }
        apiRequest('AdminLogin/SmsSendCodeByType', 'POST', {Type: type, "Phone": this.ruleForm.mobile}).then(res => {
          if (res.code == '000000') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
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
