<template>
  <div class="container">
    <!--<div class="no-register" v-if="!isSetInfo">-->
      <!--<el-button type="primary" @click="setInfo">完善资料</el-button>-->
      <!--<h2>我的资料</h2>-->
      <!--<p class="info-box">对不起，您尚未完善个人资料</p>-->
      <!--<h2>设备总览</h2>-->
      <!--<p class="info-box">请先完善个人资料</p>-->
    <!--</div>-->
    <div class="" >
      <h2>我的资料</h2>
      <el-form v-model="personInfo" label-width="100px">
        <el-form-item label="公司名称" >
          <span>{{personInfo.companyName?personInfo.companyName:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="会员名" >
          <span>{{personInfo.nickname?personInfo.nickname:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="会员组" >
        <span>{{personInfo.isVIP===1?'VIP会员':'企业会员'}}</span>
      </el-form-item>
        <el-form-item label="注册时间" >
        <span>{{personInfo.createTime}}</span>
      </el-form-item>
        <el-form-item label="会员升级"  :class="{update:!personInfo.isVIP,isVIP:personInfo.isVIP}" >
          <span @click="gotoUpdate">{{personInfo.isVIP?'您已经是会员':'立即升级'}}</span>
        </el-form-item>
      </el-form>
      <h2>设备总览</h2>
      <div class="info-box">
        <div class="info-item">
          <h3>{{ equimentInfo.putaway}}</h3>
          <p>已上架</p>
        </div>
        <div class="info-item">
          <h3>{{ equimentInfo.downshelf}}</h3>
          <p>已下架</p>
        </div>
        <div class="info-item">
          <h3>{{ equimentInfo.total}}</h3>
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
            equimentInfo:{
              putaway:0,
              downshelf:0,
              total:0
            }

          }
      },

      computed:{
        isSetInfo(){
             return this.$store.state.isSetInfo;
          },
        personInfo(){
          return this.$store.state.userInfo;
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
      },
      mounted(){
      //获取产品数据总览
        let comId=this.$store.state.userInfo.comId;
        if(comId){
          this.$ajax('Product/GetProProfile','GET',{comid:comId}).then(res=>{
            if(res.code===200){
              this.equimentInfo=res.data;
            }
          })
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
  .isVIP{
    color:limegreen;
  }
  .info-item{
    width:100px;
    flex:1;
  }
</style>
