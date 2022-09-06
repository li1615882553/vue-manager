import { ywxtMenus, getMenus } from "@/api/menu";

const state = {
  menus: {},
  defaultHref: null,
  ywxt: null
}

const getters = {
}

const mutations = {
  SET_MENUS: (state, res) => {
    state.menus[res.sys] = res.data;
    //单纯的增加不会触发响应式
    state.menus = { ...state.menus }
  },
  SET_YWXT: (state, res) => {
    state.ywxt = res || [];
    if (!res || !res.length) {
      state.defaultHref = null
      return
    }
    state.defaultHref = `/${res[0].path}`
  }
}
const actions = {
  getMenus({ commit }, sysInfo) {
    const { sysName } = sysInfo;
    return getMenus(sysName).then(data => {
      commit("SET_MENUS", {sys: sysName, data: data})
    })
  },
  getYwxt({ commit }) {
    return ywxtMenus().then(ywxts => {
      if (!ywxts) {
        commit('SET_YWXT')
        throw new Error('未能正确获取业务系统')
      }
      commit('SET_YWXT', ywxts);
      return ywxts
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}