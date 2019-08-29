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
      path:'/',
     component:()=>import('@/views/layout'),
      redirect:'/home',
      children:[
        {
          path: '/home',
          name:'home',
          component: () => import('@/views/home'),
          meta: {requireLogin: true}
        },
        {
          path:'/management',
          name:'management',
        redirect:'/management/DeviceList',
          children:[
            {path:'DeviceList',
              name:'DeviceList',
              component:()=>import('@/views/management/components/DeviceList.vue'),
              meta: {requireLogin: true}
            },
            {
              path:'RentRelease',
              name:'RentRelease',
              component:()=>import('@/views/management/components/RentRelease.vue'),
              meta: {requireLogin: true}
            }
          ]

        },
        {
          path:'/service',
          name:'service',
          redirect:'/service/MemberService',
          children:[
            {
              path:'MemberService',
              name:'MemberService',
              component:()=>import('@/views/service/MemberService.vue'),
              meta: {requireLogin: true}
            },
            {
              path:'OnlineUpdate',
              name:'OnlineUpdate',
              component:()=>import('@/views/service/OnlineUpdate.vue'),
              meta: {requireLogin: true}
            }
          ]
        },
        {
          path:'/infoSet',
          name:'infoSet',
          redirect:'/infoSet/PersonInfo',
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

