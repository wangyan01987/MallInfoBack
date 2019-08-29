import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);
const store=new Vuex.Store({
   state:{
     isLogin:false
   },
  mutations:{
     changeLogin(state,data){
       state.isLogin=true;
     }
  }
});
export default store;
