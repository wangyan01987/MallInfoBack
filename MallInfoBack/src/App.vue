<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "./assets/el-modify.css";
  html,body{
    width:100%;
    height:100%;
    margin:0;
    font-size:14px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
height:100%;
}
  .el-container{
   height:100%;
  }

</style>
