<template>
 <div class="container">
   <h2>公司介绍</h2>
   <editor ref="editor" :value="content" @input="getData"></editor>
   <div class="btn-box">
     <el-button >取消</el-button>
     <el-button type="primary" @click="save">保存</el-button>
   </div>
 </div>
</template>

<script>
   import Editor from'@/components/Tinymce'
    export default {
        name: "CompanyAbout",
      data:function(){
          return{
            content:'请输入文字',
            value:''
          }
      },
      components:{
          Editor
      },
      mounted(){

      },
      methods:{
          save(){
           console.log(this.value)

          },
        getData(content){
            this.value=content;
        }
      }
    }
</script>

<style scoped>
  .container{
    width:70%;
    padding:1rem 2rem;
  }
.btn-box{
  padding:2rem;
 }
</style>
