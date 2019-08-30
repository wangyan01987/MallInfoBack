import axios  from "axios";
//axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const api=axios.create({
  baseURL:process.env.Base_URL,
  timeout:5000
});
//拦截器---请求
api.interceptors.request.use(function(){

 },function(){

});
//拦截器---rsponse
api.interceptors.response.use(function(response){

},function(error){

});
export default api;

