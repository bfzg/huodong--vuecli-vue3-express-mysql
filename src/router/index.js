import { createRouter, createWebHistory } from 'vue-router'
import home from "@/views/home";

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/school',
    name: 'school',
    component: () => import('../views/school.vue')
  },
  {
    path:'/share',
    name:'share',
    component: ()=> import('../views/share.vue')
  },
  {
    path:'/login',
    name:'login',
    component: ()=>import('../views/login')
  },
  {
    path:'/upload',
    name:'upload',
    component: ()=>import('../views/upload')
  },
  {
    path:'/my',
    name:'my',
    component: ()=>import('../views/my')
  },
  // {
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
 if(to.path == '/' || to.path =='/login'||to.path == '/school'||to.path =='/person'){
   next();
 }else{
    const user = localStorage.getItem('teaUserInfo');
    if(user != null){
      next();
    }else{
      next('/login');
    }
 }
})

export default router
