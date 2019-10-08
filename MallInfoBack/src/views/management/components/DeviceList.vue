<template>
<div class="container">
  <h2>设备列表</h2>
  <div class="search-type">
  <div class="search-item">
    <span>行业分类</span>
      <el-cascader
        :options="options"
        v-model="searchInfo.typeId"
        @active-item-change="handleItemChange"
        :props="props"
        :clearable=true
      >
      </el-cascader>
  </div>
    <div class="search-item">
      <span>上架状态</span>
      <el-select v-model="searchInfo.onlineState">
        <el-option v-for="item in onlineState" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </div>
    <div class="search-item" style="width:30%;">
      <el-input placeholder="请输入信息标题" v-model="searchInfo.meta" ></el-input>
      <el-button type="primary" style="margin-left:1rem;" @click="search">搜索</el-button>
    </div>
  </div>
  <el-table :data="tableData" style="width:100%">
     <el-table-column  label="编号" type="index">
     </el-table-column>
     <el-table-column prop="previewImgUrl" label="缩略图">
       <template slot-scope="scope">
         <img :src=scope.row.previewImgUrl  width="100px" :alt=scope.row.name />
       </template>
     </el-table-column>
    <el-table-column prop="name" label="信息标题"></el-table-column>
    <el-table-column prop="typeName" label="行业分类"></el-table-column>
    <el-table-column prop="price" label="产品单价（元）"></el-table-column>
    <el-table-column prop="publishStatusName" label="上架状态"></el-table-column>
    <el-table-column prop="action" label="操作" >
      <template slot-scope="scope" v-if="scope.row.name">
        <p @click="goDownState(scope.row.publishStatusName,scope.$index)"><span v-if='scope.row.publishStatusName==="上架"'>下架</span><span v-else>上架</span></p>
        <p @click="change(scope.$index)">修改</p>
        <p @click="goView(scope.$index)">预览</p>
        <el-button type="primary" size="small" @click="deleteInfo(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
   <div class="foot">
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[20, 40, 60, 80]"
       :page-size='pageSize'
       layout="total, sizes, prev, pager, next, jumper"
       :total=total>
     </el-pagination>
   </div>

  </div>

</template>

<script>
  import $ajax from '@/api/ajax.js'
    export default {
        name: "DeviceList",
      data(){
         return{
           searchInfo:{

           },
           props:{
             label:'name',
             value:'id',
           },
           pageSize:20,
           total:10,
           options:[],
           currentPage:1 ,
           tradeList:[],
           onlineState:[{name:'全部',id:-1},{name:'已上架',id:1},{name:'已下架',id:0}],
           tableData:[]
         }
      },
      methods:{
          search(){
                this.getProduct();
          },
        goDownState(msg,index){
          var  msg2='';
          let status;
           if(msg==='上架'){
             msg2='下架';
             status=0;
           }
           else{
             msg2='上架';
             status=1;
           };
           let id=this.tableData[index].id;
          this.$confirm(`是否${msg2}此商品?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            $ajax('Product/UpdateProductStatus','POST',{type:'UpShelf',proId:id,status:status}).then(res=>{
                    if(res.code===200){
                      this.$message({
                        type: 'success',
                        message: `已${msg2}!`
                      });
                      this.tableData[index].publishStatusName=msg2;
                    }
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
            return false;
          });

        },
        change(index){
          let id=this.tableData[index].id;
         this.$router.push(`/management/RentRelease/?id=${id}`)

        },
        goView(index){
          let id=this.tableData[index].id;
              this.$router.push(`/management/RentRelease/?id=${id}&preview=true`)
        },
        deleteInfo(index,info){
          let id=this.tableData[index].id;
          let userId=this.$store.state.userId;
          this.$confirm(`确定删除此商品?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            $ajax('Product/DeleteProduct','POST',{proId:id,userId:userId}).then(res=>{
                if(res.code===200){
                  this.$message({
                    type: 'success',
                    message: `已删除!`
                  });
                  this.tableData.splice(index,1);
                }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
            return false;
          });

        },
        handleCurrentChange(val){
              this.currentPage=val;
          this.getProduct();
        },
        handleSizeChange(val){
            this.pageSize=val;
              this.getProduct();
        },
        handleItemChange(val){
          $ajax('ProType/GetValidChildList','GET',{pid:val[0]}).then(res=>{
            if(res.code===200){
              this.options[val-1].children=res.data;
              console.log(res.data)
            }
          })
        },
        getProduct(){
          let obj={};
          obj.name=this.searchInfo.meta;
          obj.userid=this.$store.state.userId;
          obj.publishStatus=this.searchInfo.onlineState;
            if(obj.publishStatus===undefined){
              obj.publishStatus=-1;
            }
          obj.pageIndex=this.currentPage;
          obj.pageSize=this.pageSize;
          if(this.searchInfo.typeId){
            obj.productType=this.searchInfo.typeId[1];
          }

          $ajax('Product/GetProductList','GET',obj).then(res=>{
            if(res.code===200){
              this.tableData=res.data;
              this.total=res.totalcount;
            }
          })
        },

      },

      mounted(){
        //获取商品列表父级
        $ajax('ProType/GetValidParentList','GET').then(res=>{
          if(res.code===200){
            this.options= res.data.map(function(item,index){
              item.children=[];
              return item;
            });
          }
        });

        this.getProduct();

      }
    }
</script>

<style scoped>
  .foot{
    padding-top:2rem;
  }
   .container{
     padding:1rem 2rem;
   }
  .search-type{
    display:flex;
    flex-wrap:wrap;
    border:1px solid #eee;
    padding:1rem;
  }

  .search-item{
    display:flex;
    margin-top:1rem;
    margin-right:1rem;
    line-height:40px;

  }
  .search-item span{
    margin-right:1rem;
  }
  .container p{
    margin:0;
  }
  .cell p{
    cursor:pointer;
  }
  .cell p:hover{
     color:#bbb;
          }
</style>
