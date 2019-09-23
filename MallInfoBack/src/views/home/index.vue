<template>
  <div class="container">
    <div class="no-register" v-if="!isSetInfo">
      <el-button type="primary" @click="setInfo">完善资料</el-button>
      <h2>我的资料</h2>
      <p class="info-box">对不起，您尚未完善个人资料</p>
      <h2>设备总览</h2>
      <p class="info-box">请先完善个人资料</p>

    </div>
    <div class="" v-else>
      <h2>我的资料</h2>
      <el-form v-model="personInfo" label="200px">
        <el-form-item label="公司名称" >
          <span>{{personInfo.company}}</span>
        </el-form-item>
        <el-form-item label="会员名" >
          <span>{{personInfo.member}}</span>
        </el-form-item>
        <el-form-item label="会员组" >
        <span>{{personInfo.memberGroup}}</span>
      </el-form-item>
        <el-form-item label="登录时间" >
          <span>{{personInfo.loginTime}}</span>
        </el-form-item>
        <el-form-item label="注册时间" >
        <span>{{personInfo.registerTime}}</span>
      </el-form-item>
        <el-form-item label="会员升级"  :class="{update:personInfo.memberUpdate==='立即升级'}" >
          <span @click="gotoUpdate">{{personInfo.memberUpdate}}</span>
        </el-form-item>
      </el-form>
      <h2>设备总览</h2>
      <div class="info-box">
        <div class="info-item">
          <h3>{{ equimentInfo.shelfed}}</h3>
          <p>已上架</p>
        </div>
        <div class="info-item">
          <h3>{{ equimentInfo.unshelfed}}</h3>
          <p>已下架</p>
        </div>
        <div class="info-item">
          <h3>{{ equimentInfo.allNum}}</h3>
          <p>全部设备数</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            personInfo:{
               company:'北京中住数据科技有限公司',
                member:'美丽时光海苔',
              memberGroup:'企业会员 VIP会员',
              loginTime:'',
              registerTime:'',
              memberUpdate:'立即升级'
            },
            equimentInfo:{
                shelfed:100,
              unshelfed:100,
               allNum:200
            }

          }
      },

      computed:{
        isSetInfo(){
             return this.$store.state.isSetInfo;
          }
      },
      methods:{
          setInfo(){
            this.$router.push({name:'infoSet'});
            this.$store.commit('setInfo',true)
          },
        gotoUpdate(){
          this.$router.push({name:'service'});
        }
      }
    }
</script>

<style scoped>

.no-register {
  text-align:right;
}
h2{
  text-align:left;
}
  .container{
    padding:2rem;
  }
  .info-box{
    height:7rem;
    line-height:7rem;
    border:1px solid #eee;
    text-align:center;
  }
  .update{
    color:red;
    cursor:pointer;
  }
  div.info-box{
    display:flex;
    justify-content: center;
    line-height:2.5rem;
  }
  .info-item{
    width:100px;
    flex:1;
  }
</style>
