<template>
 <div class="container release">
<h2 v-if="!preView">发布出租信息</h2>
   <h2 v-else>发布出租信息/预览</h2>
  <el-form :model="formData" :rules="rules" label-width="180px" ref="formData" v-show="!preView">
    <el-form-item label="信息标题" prop="name"><el-input v-model="formData.name"></el-input></el-form-item>
    <el-form-item label="商品分类" prop="pTypeId">
      <el-cascader
        :options="options"
        v-model="formData.pTypeId"
        @change="handleChange"
      :props="props">
      </el-cascader>
    </el-form-item>
    <el-form-item label="产品品牌">
      <el-input v-model="formData.brandName"></el-input>
    </el-form-item>
    <el-form-item label="所在地区" class="area"  required>
      <el-form-item prop="provinceCode">
        <el-select v-model="formData.provinceCode" placeholder="请选择省/直辖市" >
          <el-option v-for="item in provinceList"  :value=item.areaId :label=item.areaName :key="item.areaId" >
          </el-option>
        </el-select>
      </el-form-item>
   <el-form-item prop="cityCode">
     <el-select  placeholder="请选择市"  value="" v-model="formData.cityCode">
       <el-option v-for="item in cityList"  :value=item.areaId :label=item.areaName :key="item.areaId" >
       </el-option>
     </el-select>
   </el-form-item>
    </el-form-item>
    <el-form-item label="缩略图" prop="previewImgUrl" required>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="formData.previewImgUrl" :src="imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span>限上传一张缩略图， 图片最佳尺寸为180✖180px</span>
    </el-form-item>
    <el-form-item label="轮播顶图" prop="imgUrl" required>
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        :on-success="handleListSuccess"
        :on-preview="handlePictureCardPreview"
        :file-list="imgList"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <!--<el-dialog :visible.sync="dialogVisible" size="tiny">-->
        <!--<img width="100%" :src="formData.imgUrl" alt="">-->
      <!--</el-dialog>-->
      <span>可上传多张，图片最佳尺寸为640✖320px</span>
    </el-form-item>
    <el-form-item label="设备详情">
      <editor ref="editor" :value="formData.detail" @input="getData" width="700px"></editor>
    </el-form-item>
    <el-form-item label="主要参数">
      <div class="parameter-item" v-for="item in formData.parameter" >
        <el-input v-model="item.name"  placeholder="参数名称（例：规格）"></el-input>
        <el-input v-model="item.value"  placeholder="参数值（例：10cm*20cm）"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="交易条件" required >
         <el-form label-width="100px" class="innerForm" :model="formData" :rules="rules" ref="formData1">
           <el-form-item label="计量单位" prop="unit">
               <el-input v-model="formData.unit"></el-input>
           </el-form-item>
           <el-form-item label="产品单价" prop="price">
             <el-input v-model="formData.price"></el-input>
             <span> 元/{{formData.unit?formData.unit:'单位'}}</span>
           </el-form-item>
           <el-form-item label="最小起订量" prop="minOrderNum">
             <el-input v-model="formData.minOrderNum"></el-input>
             <span>{{formData.unit?formData.unit:'单位'}}</span>
           </el-form-item>
           <el-form-item label="供货总量" prop="stock">
             <el-input v-model="formData.stock"></el-input>
             <span>{{formData.unit?formData.unit:'单位'}}</span>
           </el-form-item>
           <el-form-item label="发货期限" prop="deliverDays">
             <span>自买家付款之日起<el-input v-model="formData.deliverDays"></el-input>天内发货</span>
           </el-form-item>
           <p>建议详细填写交易条件，否则买家无法为您的产品下单</p>

         </el-form>
    </el-form-item>
    <el-form-item label="创建时间"> {{formData.createTime}}</el-form-item>
    <el-form-item label="上架状态" prop="publishStatus">
      {{formData.publishStatus===1?'上架':'下架'}}
    </el-form-item>
    <el-form-item label="上架时间" prop="upshelfTime">
         {{formData.upshelfTime}}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="preview">预览</el-button>
      <el-button @click="cancle">取消</el-button>
      <el-button type="primary" @click="save">提交</el-button>
    </el-form-item>
  </el-form>
   <preview :content="formData"  :imgUrl="imgUrl"  :imgList="imgList" @goBack="preView=false"  :province="province" :city="city"  v-show="preView"></preview>
 </div>
</template>

<script>
  import editor from "@/components/Tinymce/index";
  import preview from '@/components/MobileView';
  import $ajax from '@/api/ajax.js';
  import test from '@/components/comTest';
  import {dateFormat} from'@/utils/common.js'
    export default {
        name: "RentRelease",
      components:{editor,preview,test},
      data(){
          let uploadUrl=process.env.Img_URL;
           return {
             props:{
               label:'name',
               value:'id',
             },
             imgList:[],
             dialogVisible: false,
             uploadUrl:uploadUrl,
             options:[
             ],
             isEdit:false,
             province:'',
             city:'',
             formData:{
               id:0,
               name:'挖掘机',
               brandName:'远大',
               cityCode:'',
               unit:'辆',
               price:'1000',
               previewImgUrl:'',
               imgUrl:'',
               minOrderNum:10,
               stock:1000,
               deliverDays:7,
               parameter:[{
               name:'重量',
                 value:'1000kg'
               },{
                 name:'直径',
                 value:'1000'

               },{
                 name:'半径',
                 value:'500'

               }],
               timeLimits:2,

             },
             imgUrl:'',
             provinceList:[],
             cityList:[],
             preView:false,
             rules:{
               name:[{required:true,message:'请填写信息标题',trigger:'blur'}],
               provinceCode:[{
                 required:true,message:'请选择所在省/直辖市',trigger:'change'
               }],
               cityCode:[{
                 required:true,message:'请选择所在市',trigger:'change'
               }],
               pTypeId:[{required:true,message:'请选择行业分类',trigger:'change'}],
               unit:[{required:true,message:'请填写计量单位',trigger:'blur'}],
               price:[{required:true,message:'请填写产品单价',trigger:'blur'}],
               minOrderNum:[{required:true,message:'请填写最小起订量',trigger:'blur'}],
               stock:[{required:true,message:'请填写供货总量',trigger:'blur'}],
               deliverDays:[{required:true,message:'请填写发货期限',trigger:'blur'}],
              previewImgUrl:[
                  {required:true,message:'请上传缩略图',trigger:'click'},
                ],
               imgUrl:[

                {required:true,message:'请上传轮播图',trigger:'click'},

                 ]


             },

           }
      },
      watch:{
        'formData.provinceCode':{
          handler(val,oldVal){
           if(oldVal!==undefined){
             this.formData.cityCode='';
           }
                 this.provinceList.forEach((item,index)=>{
                   if(val===item.areaId){
                     this.province=item.areaName;
                         this.cityList=item.cities;

                   }
                 });
          }
        },
        'imgList':{

          handler(val){
            let str='';
            val.forEach((item,index)=>{
              str=str+item.id+','
            });
            this.formData.imgUrl=str;
          },
        },
        'formData.cityCode'(val){
         for(let i=0;i<this.cityList.length;i++){
           if(val===this.cityList[i]){
             this.city=this.cityList[i].areaName;
             return;
           }
         }
        }
        },
      methods:{
        handleAvatarSuccess(res,file){
          let id=res.msg.match(/\d+/g).toString();
          this.$set(this.formData,'previewImgUrl',id);
          this.imgUrl= URL.createObjectURL(file.raw);
        },

        getData(content){
            this.formData.detail=content;
        },
        beforeAvatarUpload(){

        },
        handleRemove(file, fileList) {
            this.imgList=fileList;
        },
        handleListSuccess(res,file){
          if(res.code===200){
            let id=res.msg.match(/\d+/g).toString();
            let url=URL.createObjectURL(file.raw);
            this.imgList.push({name:'',url:url,id:id});

          }
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        cancle(){
            this.$refs.formData.resetFields();
        },
        save(){
          let a=false;
          let b=false;
          this.$refs.formData1.validate(valid=>{
            if(valid){
                a=true;
            }
            else{
              return false;
            }
          });
            this.$refs.formData.validate(valid=>{
              if(valid){
              b=true;
              }
              else{
                return false;
              }
            });
           if(a&&b){
             var obj=Object.assign({},this.formData);
             delete obj.parameter;
             obj.verifyStatus=1;
             obj.createTime=dateFormat();
             obj.userId=this.$store.state.userId;
             obj.warningStock=0;
             obj.publishStatus=1;
             obj.sort=0;
             obj.upshelfTime='';
             obj.isDelete=0;
             obj.companyId=this.$store.state.comId;
             obj.qualificationUrl='';
             obj.oldStock=0;
             obj.pTypeId=obj.pTypeId[0];
             obj.typeId=this.formData.pTypeId[1];
             if(this.formData.parameter.length!==0){
               this.formData.parameter.forEach(function(item,index){
                 obj[`paraName${index+1}`]=item.name;
                 obj[`paraValue${index+1}`]=item.value;
               });
             };
             let url=obj.id===0?'Product/AddProduct':'Product/EditProduct';
                $ajax(url,'POST',obj).then(res=>{
                    if(res.code===200){
                      this.$message({
                        message:'提交成功！',
                        type:'success'
                      })
                    }
                    else{
                      this.$message({
                        message:res.msg,
                        type:'error'
                      })
                    }
                })
           }


        },
        handleItemChange(val){
          $ajax('ProType/GetValidChildList','GET',{pid:val}).then(res=>{
            if(res.code===200){
              this.options[val-1].children=res.data;
            }
          })
        },
        handleChange(val){

        },
        preview(){
              this.preView=true;
        }
      },
      created(){
        //获取地区列表
        $ajax('Company/GetAllCities','GET').then(res=>{
          if(res.code===200){
            this.provinceList=JSON.parse(res.data);
          }
        });
        //获取商品列表父级
        $ajax('ProType/GetValidParentList','GET').then(res=>{
          if(res.code===200){
            let that=this;
            // this.options= res.data.map(function(item,index){
            //           item.children=[];
            //           return item;
            //  });
            res.data.forEach((item,index)=>{
              ( function getMsg(item){
                $ajax('ProType/GetValidChildList','GET',{pid:item.id}).then(res1=>{
                  if(res1.code===200){
                    item.children=res1.data;
                    that.options.push(item)
                  }
                })
              })(item);

            })
          }
        });
      },
      mounted(){
          //获取imgList


        this.preView=this.$route.query.preview;
        let pid=this.formData.id=this.$route.query.id;

        if(pid){
          let that=this;
          $ajax('Product/GetSingleProduct','GET',{proId:pid}).then(res=>{
            if(res.code===200){
              this.formData=res.data;

              this.imgUrl=res.data.previewImgUrl;
              this.formData.previewImgUrl=this.formData.previewImgUrlIds;
              //轮播图
              let arr= this.formData.imgUrl.split(',');
              let arrId=this.formData.imgUrlIds.split(',');

              arr.forEach(function(item,index){
                that.imgList.push({name:'',url:item,id:arrId[index]});
              });
              this.formData.pTypeId=[this.formData.pTypeId,19];
              this.formData.parameter=[{name:res.data.paraName1,value:this.formData.paraValue1},
                {name:this.formData.paraName2,value:this.formData.paraValue2},
                {name:this.formData.paraName3,value:this.formData.paraValue3}
              ]


            }
          });
        }

      }
    }
</script>

<style scoped>
.container{
  padding:2rem;
  width:55%;
}
.parameter-item{
  display:flex;

}
  .parameter-item .el-input{
    margin-right:1rem;
    margin-bottom: 1rem;
  }
.el-form-item .el-form-item{
  margin-bottom: 22px;
}
  .innerForm .el-input{
    width:auto;
  }

</style>
