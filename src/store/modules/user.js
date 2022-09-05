import { getUserInfo } from "../../api/user";

const state = {
  userInfo: null
}

const getters = {
  userInfo: state => {
    return state.userInfo
  }
}

const mutations = {
  SET_USERINFO: (state, info) => {
    state.userInfo = info;
  }
}
const actions = {
  clearUserConfig({commit}) {
    clearUserConfig(commit)
  },
  getUserInfo({commit, state}, token){
    return getUserInfo(token).then(userinfo => {
      debugger
    })
  }
}

function clearUserConfig(commit) {
  commit('SET_USERINFO', null)
}

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}