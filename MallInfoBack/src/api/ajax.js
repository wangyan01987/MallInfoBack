import api from "./api.js"
import md5 from 'md5'
import {objKeySort} from '../utils/common'
  function $ajax(url,method,data){

let copydata= Object.assign({},data);
      copydata.key=process.AppKey;
        copydata.Sign=md5(objKeySort(copydata));
        api.request({url,method,copydata});

         }

         export default $ajax;
