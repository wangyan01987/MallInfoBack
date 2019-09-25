<!--suppress ALL -->
<template>
  <div class="container">

    <div class="card1">
      <el-form :model="companyInfo" ref="companyInfo" label-width="160px" :rules="rules">
        <el-form-item label="公司Logo"  prop="companyUrl" required>
          <el-upload
            v-if="isEdit"
            class="avatar-uploader"
            :action="imgURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img  v-if='companyInfo.companyUrl' :src="companyInfo.companyUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img  v-if='companyInfo.companyUrl&&!isEdit' :src="companyInfo.companyUrl" class="avatar" >
        </el-form-item>
        <el-form-item label="公司名称" prop="comName">
          <el-input v-model="companyInfo.comName" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.comName?companyInfo.comName:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="所在地区" class="area" prop="area" required>
      <el-select v-model="companyInfo.area.city" placeholder="请选择省/直辖市"  :disabled='!isEdit'>
            <el-option v-for="item in areaList"  :value=item.areaId :label=item.areaName :key="item.areaId" >
            </el-option>
          </el-select>
            <el-select  placeholder="请选择市"  value="" v-model="companyInfo.area.areaCity" :disabled="!isEdit">
              <el-option v-for="item in cityList"  :value=item.areaId :label=item.areaName :key="item.areaId" >
              </el-option>
            </el-select>
            <el-select placeholder="请选择区" v-model="companyInfo.area.countyCity" :disabled="!isEdit">
              <el-option v-for="item in areaItemList"  :value=item.areaId :label=item.areaName :key="item.areaId" >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="公司详细地址" prop="address">
          <el-input type="textarea" v-model="companyInfo.address" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.address?companyInfo.address:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="主要经营范围" prop="businessScope">
          <el-input v-model="companyInfo.businessScope" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.businessScope?companyInfo.businessScope:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="公司成立年份" prop="establishYear" >
          <el-input v-model="companyInfo.establishYear" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.establishYear?companyInfo.establishYear:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="营业执照" prop="businessLicenseUrl">
          <el-upload
            v-if="isEdit"
            class="avatar-uploader"
            :action="imgURL"
            :show-file-list="false"
            :on-success="handleLicenseSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="companyInfo.businessLicenseUrl" :src="companyInfo.businessLicenseUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img v-if="companyInfo.businessLicenseUrl&&!isEdit" :src="companyInfo.businessLicenseUrl" class="avatar" >
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="companyInfo.contactName" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.contactName?companyInfo.contactName:'未设置'}}</span>

        </el-form-item>
        <el-form-item label="联系人电话" prop="phone">
          <el-input v-model="companyInfo.phone" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.phone?companyInfo.phone:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalPerson">
          <el-input v-model="companyInfo.legalPerson" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.legalPerson?companyInfo.legalPerson:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="法人身份证正面照" prop="idCardUrl">
          <el-upload
            v-if="isEdit"
            class="avatar-uploader"
            :action='imgURL'
            :show-file-list="false"
            :on-success="handleIDSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="companyInfo.idCardUrl" :src="companyInfo.idCardUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img v-if="companyInfo.idCardUrl&&!isEdit" :src="companyInfo.idCardUrl" class="avatar">
        </el-form-item>
        <el-form-item label="法人联系电话" prop="legalPersonPhone">
          <el-input v-model="companyInfo.legalPersonPhone" v-if="isEdit"></el-input>
          <span v-else>{{companyInfo.legalPersonPhone?companyInfo.legalPersonPhone:'未设置'}}</span>
        </el-form-item>
        <el-form-item label="公司介绍" required style="width:900px;" prop="introduce">
          <editor ref="editor" :value="companyInfo.introduce" @input="getData" v-if="isEdit"></editor>
          <span  v-html="companyInfo.introduce" v-else>{{companyInfo.introduce?'':'未设置'}}</span>
        </el-form-item>
        <el-form-item label="审核状态">
          <span>{{checkState}}</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="card2">
      <div class="title"> <h2>公司资料信息补充</h2><span v-if="isCollase" @click="isCollase=false">展开<i class="el-icon-arrow-down"></i></span><span v-else @click="isCollase=true">收起<i class="el-icon-arrow-down"></i></span></div>
      <transition name="fade">
        <el-form  label-width="160px" v-if="!isCollase">
          <el-form-item label="公司类型" prop="type">
            <el-select v-model="companyInfo.type" v-if="isEdit">
              <el-option label="有限责任公司" value="001"></el-option>
              <el-option label="股份制公司" value="002"></el-option>
              <el-option label="集团公司" value="003"></el-option>
              <el-option label="一人制公司" value="004"></el-option>
            </el-select>
            <span v-else>{{companyInfo.type?companyInfo.type:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="公司规模">
            <el-select v-model="companyInfo.scale" v-if="isEdit">
              <el-option label="1-49人" value=1></el-option>
              <el-option label="50-99人" value=2></el-option>
              <el-option label="100-499人" value=3></el-option>
              <el-option label="500人以上" value=4></el-option>
            </el-select>
            <span v-else>{{companyInfo.scale}}</span>
          </el-form-item>
          <el-form-item label="注册资本" class="area">
            <el-select v-model="companyInfo.registerFundType" v-if="isEdit">
              <el-option label="人民币" value=1></el-option>
              <el-option label="港元" value=2></el-option>
              <el-option label="台币" value=3></el-option>
              <el-option label="美元" value=4></el-option>
              <el-option label="欧元" value=5></el-option>
              <el-option label="英镑" value=6></el-option>
            </el-select>
            <span v-else>{{companyInfo.registerFundType}}</span>
            <el-input  v-model="companyInfo.registerFund"  v-if="isEdit">
            </el-input>
            <span v-if="!isEdit">{{companyInfo.registerFund}}</span>
            <span style="margin-left:1rem;">万</span>
          </el-form-item>
          <el-form-item label="公司电话" prop="phone">
            <el-input v-model="companyInfo.phone" v-if="isEdit"></el-input>
            <span v-else>{{companyInfo.phone?companyInfo.phone:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="微信" prop="weChat">
            <el-input v-model="companyInfo.weChat" v-if="isEdit">
            </el-input>
            <span v-else>{{companyInfo.weChat?companyInfo.weChat:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="QQ" prop="QQ" >
            <el-input v-model="companyInfo.QQ" v-if="isEdit">
            </el-input>
            <span v-else>{{companyInfo.QQ?companyInfo.QQ:'未设置'}}</span>
          </el-form-item>

          <el-form-item label="阿里旺旺" prop="aliTalk">
            <el-input v-model="companyInfo.aliTalk"  v-if="isEdit">
            </el-input>
            <span v-else>{{companyInfo.aliTalk?companyInfo.aliTalk:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="公司传真" prop="fax" >
            <el-input v-model="companyInfo.fax" v-if="isEdit"></el-input>
            <span v-else>{{companyInfo.fax?companyInfo.fax:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="公司Email" prop="email" >
            <el-input v-model="companyInfo.email"  v-if="isEdit">
            </el-input>
            <span v-else>{{companyInfo.email?companyInfo.email:'未设置'}}</span>
          </el-form-item>
          <el-form-item label="公司网站" prop="website">
            <el-input v-model="companyInfo.website"  v-if="isEdit"></el-input>
            <span v-else>{{companyInfo.website?companyInfo.website:'未设置'}}</span>
          </el-form-item>
        </el-form>
      </transition>
      <div class="btn-box">
        <el-button @click="isEdit=true" v-show="!isEdit" type="primary">编辑</el-button>
        <el-button  @click="cancel" v-show="isEdit">取消</el-button>
        <el-button type="primary" @click="save" v-show="isEdit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  var count=0;
  // import  province  from '@/utils/province.js';
  // import city from "@/utils/city.js";
  // import area from "@/utils/area.js";
  import {dateFormat} from '@/utils/common.js'
  import $ajax from "@/api/ajax.js"
  import CompanyConnect from './CompanyConnect'
  import CompanyAbout from './CompanyAbout'
  import Editor from'@/components/Tinymce'
  export default {
    name: "CompanyInfo",
    components:{CompanyConnect,CompanyAbout,Editor},
    data(){
      var validateArea=(rule,value,callback)=>{
        if(value['city']===''){
          callback(new Error('请选择所在省/市'))
        }
        else if(value['areaCity']===''){
          callback(new Error('请选择所在市'))
        }
        else{
          callback();
        };


      };
      let imgURL=process.env.Img_URL;
      return{
        isEdit:false,
        imgURL:imgURL ,
        companyInfo:{
           area:{
             countyCity:'',
             areaCity:''
           }
        },
        isCollase:true,
        areaList:[],
        rules:{
          comName:[{required:true,trigger:'blur',message:'请填写公司名称'}],
          area:[{validator:validateArea,trigger:'blur'}],
          content:[{required:true,trigger:'blur',message:'请填写公司介绍'}],
          type:[{required:true,message:"请选择公司类型"}],
          establishYear:[{required:true,trigger:'blur',message:"请填写公司成立时间"}],
          businessLicenseUrl:[{required:true,message:'请上传营业执照',trigger:'blur'}],
          companyUrl:[{required:true,trigger:'blur',message:"请上传公司Logo"}],
          idCardUrl:[{required:true,trigger:'blur',message:"请上传法人身份证照"}],
          legalPerson:[{required:true,trigger:'blur',message:"请填写法人姓名"}],
          businessScope:[{required:true,trigger:'blur',message:"请填写经营范围"}],
          address:[{required:true,trigger:'blur',message:'请填写公司详细地址'}],
          legalPersonPhone:[{required:true,trigger:'blur',message:'请填写法人联系电话'}],
          contactName:[{required:true,trigger:'blur',message:'请填写联系人姓名'}],
          phone:[{required:true,trigger:'blur',message:'请填联系人电话'}],
        }
      }
    },
    watch:{
      'companyInfo.area.city':function(val,oldval){
          if(oldval!==undefined){
            this.companyInfo.area.areaCity=''
          }
      },
      'companyInfo.area.areaCity':function(val,oldval){
        if(oldval!==''){
          this.companyInfo.area.countyCity=''
        }
      }

    },
    computed:{
      cityList(){
        var a=this.companyInfo.area.city;
        var arr=[];
        let l=this.areaList.length;
        for(let i=0;i<l;i++){
          if(this.areaList[i].areaId===a){
            arr=this.areaList[i].cities;
            break;
          }
        };
        return arr;
      },
      areaItemList(){
        var a=this.companyInfo.area.areaCity;
        var arr=[];

        this.cityList.forEach(function(item,index){
          if(item.areaId===a){
            arr=item.counties;
          }
        });
        return arr;
      },
      checkState(){
        if(this.companyInfo.auditStatus==1){
          return '待审核'
        }
        else if(this.companyInfo.auditStatus==2){
          return '审核通过'
        }
        else {
          return '已驳回';
        }
      }
    },
    methods:{
      getData(content){
        this.companyInfo.content=content;
        console.log(content)
      },
      handleAvatarSuccess(res,file){
        if(res.code===200){
          this.$set(this.companyInfo,'companyUrl',res.data);
        }
      },
      handleLicenseSuccess(res){
        if(res.code===200){
          this.$set(this.companyInfo,'businessLicenseUrl',res.data);
        }
      },
      handleIDSuccess(res){
        if(res.code===200){
          this.$set(this.companyInfo,'idCardUrl',res.data)
        }
      },
      beforeAvatarUpload(){},
      save(){
        let obj=Object.assign({},this.companyInfo);
        delete obj.area;
        obj.auditStatus=1;
        if(!obj.id){
          obj.id=0;
        }
       if(!obj.createTime){
         obj.createTime=dateFormat();
       }
        this.$refs.companyInfo.validate(valid=>{
          if(valid){
            //发送数据
            $ajax('Company/EditCompanyInfo','POST',obj).then(res=>{
              if(res.code===200){
                this.$message({
                  message:'编辑成功',
                  type:'success'
                });
              }
            });
          }
        })

      },
      cancel(){

        this.isEdit=false;
        this.getMsg();
      },
      getMsg(){
        let userId=this.$store.state.userId;
        $ajax('Company/GetCompanyInfo','GET',{'userId':userId}).then(res=>{
          if(res.data==null){
            this.$message({
              message:'未设置公司信息，请设置'
            });
            this.companyInfo={address: "",
              aliTalk: "",
              area: '',
              auditStatus: '',
              businessLicenseUrl: '',
              businessScope: '',
              cityCode: '',
              comName: '',
              companyUrl: '',
              contactName: '',
              countyCode: '',
              createTime: '',
              email: '',
              establishYear: '',
              fax: '',
              id: '',
              idCardUrl: '',
              introduce: '',
              legalPerson: '',
              legalPersonPhone: '',
              phone: '',
              provinceCode: '',
              qq: '',
              registerFund: '',
              registerFundType: '',
              scale: '',
              sign:'',
              userId: '',
              weChat: '',
              webSite: ''}
          }
          else{
            let obj=res.data;
            this.$store.commit('setComId',obj.id);
            this.companyInfo=obj;

            this.$set(this.companyInfo,'area',{});
            this.$set(this.companyInfo.area,'city',obj.provinceCode)
            this.$set(this.companyInfo.area,'areaCity',obj.cityCode)
            this.$set(this.companyInfo.area,'countyCity',obj.countyCode)
          }
        });
      }

    },
    created(){
      $ajax('Company/GetAllCities','GET').then(res=>{
        this.areaList=JSON.parse(res.data);


      });
    },
    mounted(){

      this.getMsg();



    }
  }
</script>

<style scoped>
  .container{
    width:100%;
  }
  .card1{
    width:50%;
  }
  .card2{
    width:50%;
    padding-left:100px;
  }
  .card2 .title{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .title span{
    cursor:pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .btn-box{
    text-align: center;
    padding:2rem 0;
  }
</style>
