// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/el-modify.css";
import store from "./store/index.js"

Vue.config.productionTip = false;
Vue.use(ElementUI);
 import $ajax from './api/ajax.js';
 Vue.prototype.$ajax=$ajax;
/* eslint-disable no-new */
let vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


