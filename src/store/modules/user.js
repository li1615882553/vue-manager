import cookieAuthInfo from "../../util/cook";
import { login as userLogin, logout as userLogout, getUserInfo } from "../../api/user";
import router from '@/router';

const state = {
  userInfo: null
}
const getters ={
}

const mutations = {
  SET_USERINFO: (state, info) => {
    state.userInfo = info;
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

//清楚当前用户登陆信息
function clearUserConfig(commit) {
  commit('SET_USERINFO', null);
  commit('menu/SET_YWXT', null, { root: true });
  commit('app/CLEAR_SYSINFO', null, { root: true });
  cookieAuthInfo.token = null;
  cookieAuthInfo.username = null;
}

function configUserinfo({ commit, state }, res) {
  cookieAuthInfo.token = res.token;
  cookieAuthInfo.username = res.username;
  commit('SET_USERINFO', {token: res.token, username: res.username});
  return state.userInfo;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}