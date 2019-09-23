'use strict';
const merge = require('webpack-merge')
const prodEnv = require('./prod.env');
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
   Base_URL:'"http://192.168.0.103:6689/api/"',
  //Base_URL:'"https://zulin.zhujianyun.com/api/"',
  Img_URL:'"http://192.168.0.103:6689/api/OSSFilePutTestApi/PostProfilePicture"',
 // Base_URL:'"http://localhost:15188/api/"',
  APP_KEY:'"zhongzhu@bj"'
});
