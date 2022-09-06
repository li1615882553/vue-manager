import cookieAuthInfo from "../../util/cook";
import { login as userLogin, logout, getUserInfo } from "../../api/user";

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
  clearUserConfig({ commit }) {
    clearUserConfig(commit)
  },
  getUserInfo({ commit, state }, token) {
    return getUserInfo(token).then(userinfo => {
      configUserinfo({ commit, state }, userinfo)
    })
  }
}

function clearUserConfig(commit) {
  commit('SET_USERINFO', null)
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