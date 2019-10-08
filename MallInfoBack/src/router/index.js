import vue from 'vue'
import Router from 'vue-router';
vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
const router= new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:()=>import('@/views/login')
    },
    {
      path:'/rigister',
      name:'register',
      component:()=>import('@/views/register')
    },
    {
      path:'/',
     component:()=>import('@/views/layout'),
      redirect:'/home',
      children:[
        {
          path: '/home',
          name:'home',
          component: () => import('@/views/home'),
          meta: {requireLogin: true,name:'首页'}
        },
        {
          path:'/management',
          name:'management',
          component:()=>import('@/views/management/index'),
        redirect:'/management/DeviceList',
          meta:{name:'管理'},
          children:[
            {path:'DeviceList',
              name:'DeviceList',
              component:()=>import('@/views/management/components/DeviceList.vue'),
              meta: {requireLogin: true ,name:'设备列表'}
            },
            {
              path:'RentRelease',
              name:'RentRelease',
              component:()=>import('@/views/management/components/RentRelease.vue'),
              meta: {requireLogin: true,name:'发布出租'}
            }
          ]

        },
        {
          path:'/service',
          name:'service',
          component:()=>import('@/views/service/index.vue'),
          redirect:'/service/MemberService',
          meta:{name:'会员服务'},
          children:[
            {
              path:'MemberService',
              name:'MemberService',
              component: () => import('@/views/service/MemberService'),
              meta: {requireLogin: true,name:'.会员服务'}
            },
            {
              path:'OnlineUpdate',
              name:'OnlineUpdate',
              component:()=>import('@/views/service/OnlineUpdate.vue'),
              meta: {requireLogin: true,name:'在线升级'}
            }
          ]
        },
        {
          path:'/infoSet',
          name:'infoSet',
          component:()=>import('@/views/infoSet/index'),
          redirect:'/infoSet/PersonInfo',
          meta:{name:'设置'},
          children:[
            {
              path:'PersonInfo',
              name:'PersonInfo',
              component:()=>import('@/views/infoSet/PersonalInfo.vue'),
              meta: {requireLogin: true,name:'个人资料'}
            },{
              path:'PersonalPsd',
              name:'PersonalPsd',
              component:()=>import('@/views/infoSet/PersonalPsd.vue'),
              meta: {requireLogin: true,name:'密码管理'}
            },
            {
              path:'CompanyInfo',
              name:'CommpanyInfo',
              component:()=>import('@/views/infoSet/ComapnyInfo.vue'),
              meta: {requireLogin: true,name:'公司资料'}
            },
            {
              path:'CompanyConnect',
              name:'CompanyConnect',
              component:()=>import('@/views/infoSet/CompanyConnect.vue'),
              meta: {requireLogin: true,name:'公司联系方式'}
            },
            {
              path:'CompanyAbout',
              name:'CompanyAbout',
              component:()=>import('@/views/infoSet/CompanyAbout.vue'),
              meta: {requireLogin: true,name:'公司介绍'}
            }
          ]
        }
      ]

    },
    {
      path: '*',
      component: () => import('@/views/error/404.vue')
    }
  ]
});
import store from "../store/index.js";
router.beforeEach((to,from,next)=>{
  console.log('------')
  if(to.matched.some(record=>record.meta.requireLogin)){
    if(!store.state.isLogin){
           next('/login')
    }else{
      next();
    }
  }
  else{
    next()
  }

});
export default router;

