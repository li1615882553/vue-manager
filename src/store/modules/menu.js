import { ywxtMenus } from "../../api/menu";

const state = {
  menus: {},
  defaultHref: null,
  ywxt: null
}

const getters = {
}

const mutations = {
  SET_MENUS: (state, res) => {

  },
  SET_YWXT: (state, res) => {
    state.ywxt = res || [];

  }
}
const actions = {
  getMenus({ commit }, sysInfo) {
    const { sysName } = sysInfo
  },
  getYwxt({ commit }) {
    return ywxtMenus().then(ywxt => {
      debugger
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