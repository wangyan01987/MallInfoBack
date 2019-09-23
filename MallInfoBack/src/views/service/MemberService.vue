<template>
<div class="container">
  <h2>会员服务一览表</h2>
   <el-table :data="tableData" border>
     <el-table-column label="服务范围\会员组"  prop="serviceName">
       <template slot-scope="scope" >
         {{scope.row.serviceName}}
         <img src="../../assets/img/timg.jpg" style="width:25px" v-if="scope.row.serviceName==='拥有VIP标志'"/>
       </template>
     </el-table-column>
     <el-table-column label="会员企业" prop="companyMember">
        <template slot-scope="scope">
          <i class="el-icon-remove" v-if="scope.row.companyMember==='否'" style="color:red;"></i>

          <span v-else>{{scope.row.companyMember}}</span>
        </template >
     </el-table-column>
     <el-table-column label="VIP会员" prop="VIP">
       <template slot-scope="scope">
         <i class="el-icon-success" v-if="scope.row.VIP=='是'" style="color:green"></i>
         <el-button v-else-if="scope.row.VIP=='在线升级'" type="primary" @click="goToUpdate">在线升级</el-button>
         <span v-else>{{scope.row.VIP}}</span>

       </template>
     </el-table-column>
   </el-table>
</div>
</template>

<script>
    export default {
        name: "MemberService",
      data(){
          return{
            tableData:[
              {serviceName:'收费模式',
                companyMember:'免费',
                VIP:'包年'
              },
              {serviceName:'年费',
                companyMember:'—',
                VIP:'2000元/年'
              },
              {
                serviceName:'拥有VIP标志',
                companyMember:'否',
                VIP:'是'
              },
              {
                serviceName:'信息优先排序',
                companyMember:'否',
                VIP:'是'
              },
              {
                serviceName:'产品首页推荐',
                companyMember:'否',
                VIP:'是'
              },
              {
                serviceName:'信息关键字排名',
                companyMember:'否',
                VIP:'是'
              },
              {
                serviceName:'发布信息数量',
                companyMember:5,
                VIP:'不限'
              },
              {
                serviceName:'拥有公司主页',
                companyMember:'是',
                VIP:'是'
              },
              {
                serviceName:'',
                companyMember:'',
                VIP:'在线升级'
              },

            ]
          }
      },
     methods:{
       goToUpdate(){
         this.$router.push({name:'OnlineUpdate'})
       }
     }
    }
</script>

<style scoped>
.container{
  padding:1rem;
}
  h2{
    text-align:center;
  }
</style>
