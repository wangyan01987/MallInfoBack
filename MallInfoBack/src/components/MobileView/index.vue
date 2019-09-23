<template>
  <div class="g-mobile-frame">
    <div ><el-button type="default" @click="goBack">返回</el-button></div>
     <div class="g-mobile-cover">
       <div class="g-mobfra-in">
         <!-- 设计内容头部开始 -->
         <div class="g-mobfra-header"></div>
         <!-- 设计内容开始 -->
         <div class="g-mobfra-main">
           <!-- // mobile端页面加载结束 -->
         </div>
         <!-- 设计内容结束 -->
         <!-- 设计内容尾部开始 -->
         <div class="g-mobfra-footer"></div>
       </div>
       <div class="g-mobile-area">
         <div class="g-mobfra-editor-wrap">
           <div class="g-mobfra-mask">
             <div class="g-mobfra-editor">
               <div class="my-area">
                 <el-carousel trigger="click" height="150px">
                   <el-carousel-item v-for="item in imgList" :key="item.id">
                     <img :src='item.url' alt="" width="300px">
                   </el-carousel-item>
                 </el-carousel>
                <div class="detail">
                  <h2 style="color:#FF1613;margin-bottom:0">￥{{content.price}}/{{content.unit}}</h2>
                  <p style="margin-top:5px;margin-left:8px;"><span>{{content.title}}</span></p>
                </div>
                 <p class="bar"></p>
                  <div class="detail">
                    <p><span>起订</span>{{content.minOrderNum}}{{content.unit}}</p>
                    <p><span>供货数量</span>{{content.stock}}{{content.unit}}</p>
                    <p><span>所在地</span>{{province}}{{city}}</p>
                    <p><span>发货期限</span>自买家付款之日起{{content.deliverDays}}天内发货</p>
                    <p><span>最后更新</span>{{date}}</p>
                  </div>
                 <p class="bar"></p>
                 <div class="detail">
                   <p><img :src=companyInfo.companyUrl style="width:30px;height:30px;vertical-align: middle;margin-right:10px;" />
                     <span>{{companyInfo.comName}}</span>
                   </p>
                   <p><span>手机号</span>{{companyInfo.phone}}</p>
                   <p><span>邮箱</span>{{companyInfo.email}}</p>
                   <p><span>QQ</span>{{companyInfo.qq}}</p>
                   <p><span>阿里旺旺</span>{{companyInfo.aliTalk}}</p>
                   <p><span>微信</span>{{companyInfo.weChat}}</p>
                 </div>
                 <p class="bar"></p>
                 <div class="detail product">
                   ———&nbsp;产品详情&nbsp;———
                   <div v-html="content.detail">{{content.detail}}</div>
                 </div>
               </div>

             </div>
           </div>

         </div>
       </div>
     </div>

  </div>
</template>

<script>
  import  {dateFormat}  from '@/utils/common.js';
  import $ajax from '@/api/ajax.js'
    export default {
        name: "index",
      props:['content','imgUrl','imgList','province','city'],
      data(){
   var date=dateFormat();
          return{
            date:date,
            companyInfo:{
            }
          }
      },
      methods:{
          goBack(){
               this.$emit('goBack');
          }
      },
      mounted(){
      //获取公司信息
        let userid=this.$store.state.userId;
        $ajax('Company/GetCompanyInfo','GET',{userId:userid}).then(res=>{
          if(res.code===200){
            this.companyInfo=res.data;
          }
        })

      }
    }
</script>

<style scoped>
  .g-mobile-frame{
    width:100%;
    height:100%;
  }
  .g-mobile-cover {
    position: relative;
    top: 70px;
  }
  .g-mobile-frame .g-mobile-cover .g-mobfra-in {
    margin: 0 auto;
    position: relative;
    top: 0;
    width: 320px;
    height: 480px;
  }
  .g-mobile-frame .g-mobile-cover .g-mobfra-in .g-mobfra-header {
    position: absolute;
    top: -49px;
    left: -26px;
    width: 355px;
    height: 49px;
    background: url(./img/mobfra-header.png) no-repeat 0 0;
    background-size: 355px 49px;
  }
  .g-mobile-frame .g-mobile-cover .g-mobfra-in .g-mobfra-main {
    position: absolute;
    top: 0;
    left: -26px;
    width: 355px;
    height: 100%;
    background: url(./img/mobfra-content.png) repeat-y 0 0;
    background-size: 355px 100%;
  }
  .g-mobile-frame .g-mobile-cover .g-mobfra-in .g-mobfra-footer {
    position: absolute;
    bottom: -89px;
    left: -26px;
    width: 355px;
    height: 89px;
    background: url(./img/mobfra-footer.png) no-repeat 0 0;
    background-size: 355px 89px;
  }
  .g-mobile-frame .g-mobile-cover .g-mobile-area {

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;

  }
  .g-mobile-frame .g-mobile-cover .g-mobile-area .g-mobfra-editor-wrap {

    margin: 0 auto;
    width: 400px;
    position: relative;

  }
  .g-mobile-frame .g-mobile-cover .g-mobile-area .g-mobfra-editor-wrap .g-mobfra-mask {

    margin: 0 auto;
    width: 400px;
    overflow: hidden;

  }
  .g-mobile-frame .g-mobile-cover .g-mobile-area .g-mobfra-editor-wrap .g-mobfra-mask .g-mobfra-editor {

    margin: 0 auto;
    width: 320px;
    height: 100%;
    overflow: hidden;

  }
  .my-area{
    height:480px;
    width:100%;
    overflow-y:auto;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .detail{
    padding:0 1rem;
  }
  .bar{
    BACKGROUND-COLOR:#EEE;
    HEIGHT:10px;
  }
  .product{
    text-align:center;
    color:#999;
  }
  .detail span{
    font-weight:bold;
    width:4rem;
    display:inline-block;
    margin-right:2rem;
  }
  .detail >>> img{
  width:100%;
  }
</style>
