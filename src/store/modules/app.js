const state = {
  /**当前系统信息 */
  curSys: null,
  /**所有系统的信息 */
  sysInfos: [],
  /**侧边栏是否打开 */
  sidebar: true
}

const getters = {
  curSys: state => state.curSys
}

const mutations = {
  SET_CURSYS(state, sysInfo) {
    if (!state.sysInfos.filter(i => i.name === sysInfo.name).length) {
      state.sysInfos.push(sysInfo);
    }
    state.curSys = sysInfo.name;
  },
  TOGGLE_SIDEBAR(state){
    state.sidebar = !state.sidebar;
  },
  CLEAR_SYSINFO(state){
    state.curSys = null;
    state.sysInfos = [];
  }
}
const actions = {
  changeSys({ commit }, sysInfo) {
    commit("SET_CURSYS",sysInfo)
  },
  toggleSidebar({ commit }) {
    commit(MUTATION_TYPES.TOGGLE_SIDEBAR)
  },
  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}