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
     isSetInfo:false,
     userInfo:{
       Mobile:''
     },
     userId:'',
     comId:'',
     vipTypeId:'',
     isVIP:''


   },
  mutations:{
     changeLogin(state,data){
       state.isLogin=data;
     },
    setInfo(state,data){
       state.isSetInfo=data;
      },
    setUserInfo(state,data){
       state.userInfo=data;
    },
    setUserId(state,data){
       state.userId=data;
    },
    setComId(state,data){
       state.comId=data;
    },
    setvipTypeId(state,data){
       state.vipTypeId=data;
    },
    setisVIP(state,data){
       state.isVIP=data;
    }

  }
});
export default store;
