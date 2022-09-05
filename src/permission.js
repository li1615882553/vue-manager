//用于添加路由前的钩子函数
import config from '@/config'
import router from '@/router'
import store from '@/store'

const NEEDNOT_AUTH = ['/login', '/404']

async function authGuard(to, from, next){
  debugger
  if (NEEDNOT_AUTH.indexOf(to.path) !== -1) {
    return next()
  }
  if(!store.getters.userinfo && !(await recoverUserInfo())){

  }
}

//拦截起始页的路由, 跳转到第一个业务系统
async function startPathGuard(to, from, next) {
  if (to.path !== "/") {
    return next();
  }
  let href = store.state.menu.defaultHref;
}

async function recoverUserInfo(){
  try{
    await store.dispatch("user/getUserInfo");
    await store.dispatch("menu/");
    return true;
  }catch(err){
    return false
  }
}

router.beforeEach(authGuard);
router.beforeEach(startPathGuard);