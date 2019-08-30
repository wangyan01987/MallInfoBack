<template>
  <div class="register-container">
    <el-form ref="form" :model="registerForm" label-width="100px">
      <p>账户信息</p>
      <el-form-item label="会员名">
        <el-input v-model="registerForm.name"></el-input>
        <span>4-20个字符，只能使用小写字母(a-z)、数字(0-9)、下划线(_)、中划线(-)，且至少包含2种</span>
    </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="registerForm.psd"></el-input>
        <span>6-20个字符，区分大小写，推荐使用数字、字母和特殊符号组合</span>
      </el-form-item>
      <el-form-item label="重复输入密码">
        <el-input v-model="registerForm.repsd"></el-input>
        <span>6-20个字符，区分大小写，推荐使用数字、字母和特殊符号组合</span>
      </el-form-item>
      <p>联系方式</p>
      <el-form-item label="真实姓名">
        <el-input v-model="registerForm.realName"></el-input>
        <el-radio-group v-model="registerForm.gender">
          <el-radio label="先生"></el-radio>
          <el-radio label="女士"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在地区">
        <el-select v-model="registerForm.area" placeholder="请选择地区"></el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "register",
      data:function(){
          return{
            registerForm:{
              psd:'',
              repsd:''

            }
          }
      }
    }
</script>

<style scoped>

</style>
