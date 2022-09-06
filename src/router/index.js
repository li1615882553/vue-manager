import Vue from 'vue'
import Router from 'vue-router'

const subSysRouterWebpackContext =  require.context('../systems', true, /router\/index\.js$/);
const subSysRouter = subSysRouterWebpackContext.keys().map(path => {
  const keys = path.split('/')[1];
  const value = subSysRouterWebpackContext(path);  // 返回引入的信息
  return value.default;
})

// 构造子系统路由
const allRouter = [].concat(...subSysRouter); 
// 无需权限的路由
const withoutAuthorityRoot = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('../view/login/login.vue')
  },
  {
    path: '/404',
    component: () => import('../view/errorPage/404.vue')
  },
  {
    path: '/logout',
    component: () => import('../view/logout/logout.js')
  }
]

const layoutRouter = [
  {
    path: '/',
    component: () => import('@/layout'),
    children: [...allRouter]
  },
  {
    name: 'NotFound',
    path: '*',
    redirect: '/404'
  }
]

const routers = withoutAuthorityRoot.concat(layoutRouter)

Vue.use(Router)
export default new Router({
  routes: routers
})
