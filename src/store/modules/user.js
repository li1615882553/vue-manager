import cookieAuthInfo from "../../util/cook";
import { login as userLogin, logout as userLogout, getUserInfo } from "../../api/user";
import router from '@/router';

const LOGOUT_TIMEOUT = 600000; // 10min 
const CHECK_TIMEOUT_FREQUENCY = 2000;

const state = {
  userInfo: null,
  clockStartTime: null,
  clockhandle: null,
  delayLogoutCb: null
}
const getters ={
}

const mutations = {
  SET_USERINFO: (state, info) => {
    state.userInfo = info;
  },
  SET_CLOCK_START_TIME: (state, time) => {
    state.clockStartTime = time;
  },
  SET_CLOCK_HANDLE:(state, handle) => {
    if(state.clockhandle){
      window.clearInterval(state.clockhandle);
    }
    state.clockhandle = handle
  },
  SET_DELAY_LOUGOUT_CB:(state, handle) => {
    if(!handle && state.delayLogoutCb){
      window.removeEventListener('click', state.delayLogoutCb, true);
      return ;
    }
    if(state.delayLogoutCb){
      window.removeEventListener('click', state.delayLogoutCb, true)
    }
    window.addEventListener('click', handle, true);
    state.delayLogoutCb = handle;
  }
}
const actions = {
  login({ commit, state }, loginInfo) {
    return userLogin(loginInfo).then(res => configUserinfo({ commit, state }, res))
  },
  logout({commit}){
    userLogout();
    window.setTimeout(() => {
      clearUserConfig(commit);
      router.replace('/login');
    }, 0);
  },
  clearUserConfig({ commit }) {
    clearUserConfig(commit)
  },
  getUserInfo({ commit, state }, token) {
    return getUserInfo(token).then(userinfo => {
      configUserinfo({ commit, state }, userinfo)
    })
  }
}

//开启自动退出定时器
function startClock(commit, state){
  const lougoutCb = delayLogout.bind(null, commit);
  commit('SET_DELAY_LOUGOUT_CB', lougoutCb);
  return window.setInterval(checkClock.bind(null, state), CHECK_TIMEOUT_FREQUENCY);
}

function delayLogout(commit){
  commit('SET_CLOCK_START_TIME', Date.now());
}

function checkClock(state){
  if(Date.now() - state.clockStartTime < LOGOUT_TIMEOUT){
    return;
  }
  router.replace('/logout');
}
//清除当前用户登陆信息
function clearUserConfig(commit) {
  commit('SET_DELAY_LOUGOUT_CB', null);
  commit('SET_CLOCK_START_TIME', 0);
  commit('SET_CLOCK_HANDLE', null);

  commit('SET_USERINFO', null);
  commit('menu/SET_YWXT', null, { root: true });
  commit('app/CLEAR_SYSINFO', null, { root: true });
  cookieAuthInfo.token = null;
  cookieAuthInfo.username = null;
}

//配置用户的登陆信息
function configUserinfo({ commit, state }, res) {
  commit('SET_CLOCK_START_TIME', Date.now());
  commit('SET_CLOCK_HANDLE', startClock(commit, state));
  commit('SET_USERINFO', {token: res.token, username: res.username});

  cookieAuthInfo.token = res.token;
  cookieAuthInfo.username = res.username;
  return state.userInfo;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}