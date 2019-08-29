<template>
    <el-menu default-active="$route.path" @open="handleOpen" @close="handleClose" text-color="#fff" background-color="#304156" :collapse="isCollapse"
       router
    >
      <el-menu-item index="/home">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="management">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">管理</span>
        </template>
        <el-menu-item index="/management/DeviceList">
          <span>设备列表</span>
        </el-menu-item>
        <el-menu-item index="/management/RentRelease">
          <span>发布出租</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">会员服务</span>
        </template>
        <el-menu-item index="/service/MemberService">
          <span>会员升级</span>
        </el-menu-item>
        <el-menu-item index="/service/OnlineUpdate">
          <span>在线服务</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </template>
        <el-menu-item index="/infoSet/PersonInfo">
          <span>个人资料</span>
        </el-menu-item>
        <el-menu-item index="/infoSet/PersonPsd">
          <span>密码管理</span>
        </el-menu-item>
        <el-menu-item index="4-3">
          <span>公司资料</span>
        </el-menu-item>
        <el-menu-item index="4-4">
          <span>公司联系方式</span>
        </el-menu-item>
        <el-menu-item index="4-5">
          <span>公司介绍</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "homeMenu",
        data:function(){
          return{
            isCollapse:false,

          }
        },
      methods:{
          handleOpen(){

          },
        handleClose(){

        }
      }
    }
</script>

<style scoped>
  .el-menu{
    border-right:none;
  }
</style>
