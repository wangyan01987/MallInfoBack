import api from "./api.js"
import md5 from 'md5'
import {objKeySort} from '../utils/common';
  function $ajax(url,method,data1){

           if(method==='POST'){
             let data= Object.assign({},data1);
             let copydata=Object.assign({},data1);
            copydata.appKey=process.env.APP_KEY;
            data.sign=md5(objKeySort(copydata).toLowerCase());
            console.log(objKeySort(copydata).toLowerCase())
             return api.request({url,method,data});
           }
           else{
             let params= Object.assign({},data1);
             return api.request({url,method,params});
           }
         }
         export default $ajax;
