<template>
    <div class="container1">
      <h2>付款到账</h2>
     <div class="box">
         <h3 style="text-align:center;border-bottom: 1px solid #eee;line-height:5rem;">支付金额 ¥{{pay}} </h3>
    <div class="pay-box" v-if="!ispay">
      <p> 请选择支付方式</p>
      <p ><img src="./images/wechat.jpg" alt="微信支付" width="160px" @click="wechatPay=!wechatPay"><span><el-checkbox v-model="wechatPay"></el-checkbox></span></p>
     <transition name="fade">
       <div v-show="wechatPay" id="weChatCode" ref="weChatCode"> </div>
     </transition>
      <p ><img src="./images/alipay.jpg" alt="支付宝支付" style="width:150px;" @click="aliPay=true"><span><el-checkbox v-model="aliPay"></el-checkbox></span></p>
     <transition>
       <iframe v-show="aliPay" id="aliPay" ref="aliPay" src="/static/alipay.html">


       </iframe>
     </transition>
    </div>
       <div class="success-box" v-else>
              <p>支付成功！</p>
       </div>
     </div>
    </div>
</template>

<script>
  import QRCode from 'qrcodejs2';
  import $ajax from '@/api/ajax.js'
    export default {
        name: "index",
      data(){
          return{
            activeName:'weChart',
            wechatPay:false,
            aliPay:false,
            pay:'2000',
            ispay:false
          }

      },
      computed:{
         uid(){
          return this.$store.state.userId;
         },
        vtype(){
           return this.$store.state.vipTypeId;
        }

      },
      methods:{
        createweChatCode(){
            $ajax('UOpenVApi/WeChatPay','POST',{uid:this.uid,vtype:this.vtype}).then(res=>{
              let url=res.data.qrCodeUrl;
              let order=res.data.outTradeNo;
              let uid=this.uid;
              let weChatCode = new QRCode('weChatCode', {
                width: 120,
                height: 120,
                text: url, // 二维码地址
                colorDark : "#000",
                colorLight : "#fff",
              });
              let that=this;
              let flag=0;
              let timer=setInterval(function(){
                if(flag===1||!that.wechatPay){
                    clearInterval(timer);
                    return;
                };
                  $ajax('UOpenVApi/GetPayStatust','GET',{orderno:order,uid:uid}).then(res=>{
                    if(res.code===200){
                         flag=1;
                         that.$message({
                           message:'支付成功！',
                           type:'success'
                         });
                         that.ispay=true;
                    }
                  })
              },10000);
            });


        },


      },
      watch:{
             wechatPay(val){
               if(val){
                 this.$refs.weChatCode.innerHTML='';
                 this.createweChatCode();
               }
               else{
                 return;
               }
             },
        aliPay(val){
               if(val){
                 $ajax('UOpenVApi/AliPay','POST',{uid:this.uid,vtype:this.vtype,pageUrl:'http://localhost:8081/#/service/OnlineUpdate'}).then(res=>{
                 if(res.code===200){
                   let par=res.data.responseBody;
                 //  let target=window.open('/static/alipay.html','_blank');
                   let target=this.$refs.aliPay.contentDocument;
                   target.write(par);
                 }

                 })
               }
        }
      }
    }
</script>

<style scoped>
.container1{
  padding:1rem;
  height:100%;
}
  .box{
    border:1px solid #eee;
  }
  .box .el-tabs{
    padding:0 2rem;
  }
  .pay-box img{
    cursor:pointer;
    vertical-align: middle;
  }
  #weChatCode {
  padding-left:50px;
  }
  .fade-enter-active,.fade-levae-active{
      transition:opacity 1s;
  }
  .fade-enter,.fade-levae-to{
    opacity:0;
  }
  .success-box{
    text-align:center;
    font-size:2rem;
    background-color:#4ACC60;
    color:#fff;
  }
  .success-box p{
    margin:0;
    height:4rem;
    line-height:4rem;
  }
  .box h3{
    margin:0;
  }
  #aliPay{
    width:100%;
    height:500px;
  }
</style>
