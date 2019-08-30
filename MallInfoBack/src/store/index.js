import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);
const store=new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
   state:{
     isLogin:false,
     isSetInfo:false
   },
  mutations:{
     changeLogin(state,data){
       state.isLogin=data;
     },
    setInfo(state,data){
       state.isSetInfo=data;
    }
  }
});
export default store;
