import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

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
          redirect:'/service/MemberService',
          meta:{name:'会员服务'},
          children:[
            {
              path:'MemberService',
              name:'MemberService',
              component:()=>import('@/views/service/MemberService.vue'),
              meta: {requireLogin: true,name:'会员服务'}
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
          redirect:'/infoSet/PersonInfo',
          meta:{name:'设置'},
          children:[
            {
              path:'PersonInfo',
              name:'PersonInfo',
              component:()=>import('@/views/infoSet/PersonalInfo.vue'),
              meta: {requireLogin: true}
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
  console.log(to.matched)
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

