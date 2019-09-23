import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

import Qs from 'qs'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.Base_URL, // api的base_url 设置代理后不需要baseUrl
  timeout: 5000 // 请求超时时间
});
// request拦截器
let errorMessage = true;
service.interceptors.request.use(
  config => {
   //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
   config.headers['Content-Type'] = 'application/json;';

// 设置当前请求是否是错误提示
    try {
      errorMessage = config.setting.errorMessage
    } catch (err) {
      errorMessage = true
    }
// 设置请求参数
   // config.data = Qs.stringify(config.data);
  //config.data = JSON.stringify(config.data);

    return config
  },
  error => {
    Promise.reject(error)
  }
);
//respone拦截器
service.interceptors.response.use(response => {
    const res = response.data;
    if (res.code != '000000') {
// 提示错误信息
      if(!response.config.url.includes('AdminLogin/ValidPhone')&&res.code=='000007')
        Message({
          message: res.msg || '网络错误',
          type: 'error',
          duration: 5 * 1000
        });
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: '错误',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
);
export default service

