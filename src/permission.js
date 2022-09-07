//用于添加路由前的钩子函数
import config from '@/config'
import router from '@/router'
import store from '@/store'
import { getSystemFromPath } from "./util";
import FrmConfig from "@/config";
import cookieAuthInfo from "@/util/cook";

const NEEDNOT_AUTH = ['/login', '/404']
const NEEDNOT_REDIRECT = ['/404', '/', '/401', '/logout']

function beforAuthGuard(to, from, next){
  //有token 或者 没有token跳转的是不需要登陆信息的页面则 允许跳转
  if(cookieAuthInfo.token || NEEDNOT_AUTH.indexOf(to.path) !== -1){
    return next();
  }
  //没有token,则跳往登录页
  nextLogin(next, to);
}

async function authGuard(to, from, next) {
  if (NEEDNOT_AUTH.indexOf(to.path) !== -1) {
    return next()
  }

  if (!store.getters.userInfo && !(await recoverUserInfo())) {
    return nextLogin(next, to)
  }
  return next();
}

//拦截登陆也的路由
//拦截起始页的路由, 跳转到第一个业务系统
async function startPathGuard(to, from, next) {
  if (to.path !== "/") {
    return next();
  }
  let href = store.state.menu.defaultHref;
  if (!href) {
    try {
      await store.dispatch('menu/getYwxt')
      const redirect = to.query.redirect && decodeURIComponent(to.query.redirect)
      next(redirect || store.state.menu.defaultHref)
      return;
    } catch (e) {
      return next('/401');
    }
  }
  from.path === href ? next(false) : next(href)
}

//切换系统时调用
async function changeSysGuard(to, from ,next){
  const toSysName = getSystemFromPath(to.path)
  const currSysName = store.getters.currSys
  const toSysConfig = FrmConfig.sysConfig[toSysName]
  const currSysConfig = FrmConfig.sysConfig[currSysName]

  if(!toSysConfig){
    currSysConfig && currSysConfig.leave && (await currSysConfig.leave(store));
    next();
    return ;
  }
  
  store.dispatch("app/changeSys", toSysConfig);
  await store.dispatch('menu/getMenus', {
    sysName: toSysName
  })
  currSysConfig && currSysConfig.leave && (await currSysConfig.leave(store))
  toSysConfig.enter && (await toSysConfig.enter(store))
  next();
}

async function recoverUserInfo() {
  try {
    await store.dispatch("user/getUserInfo", cookieAuthInfo.token);
    await store.dispatch("menu/getYwxt");
    return true;
  } catch (err) {
    return false
  }
}

//验证信息失败,退汇登录页
function nextLogin(next, { path }) {
  store.dispatch('user/clearUserConfig');
  if (NEEDNOT_REDIRECT.indexOf(path) !== -1) {
    return next('/login');
  }
  next({
    path: '/login',
    query: {
      redirect: encodeURIComponent(path)
    }
  })
}

router.beforeEach(beforAuthGuard);
router.beforeEach(startPathGuard);
router.beforeEach(authGuard);
router.beforeEach(changeSysGuard);