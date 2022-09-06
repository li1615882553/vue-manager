export var name = 'tagsInfo';

export default{
  namespaced: true,
  state:{
    // cacheTags: [],
    viewTages: []
  },
  getters: {
    // GET_CACHESTAGS: (sADD_ONE_VIEWTAGEState) => { return state.cacheTags },
    GET_VIEWTAGES: (state) => { return state.viewTages }
  },
  mutations: {
    ADD_VIEWTAGES: (state, oneTage) => {
      const index = state.viewTages.findIndex( item => item.path === oneTage.path)
      if(index === -1) {
        state.viewTages.push(oneTage)
      }
    },

    DEL_ONE_VIEWTAGES: (state, tagIndex) => {
      if(tagIndex || tagIndex < 0 || tagIndex > state.viewTages.length) {
        return ;
      }
      state.viewTages.splice(tagIndex, 1);
    },

    DEL_OTHER_VIEWTAGES: (state, currentTageIndex) => {
      if(tagIndex || tagIndex < 0 || tagIndex > state.viewTages.length) {
        return ;
      }
      state.viewTages = state.viewTages.slice(currentTageIndex, currentTageIndex + 1)
    },

    DEL_ALL_VIEWTAGES:(state) => state.viewTages = []
  },
  actions: {
    delAllTage( {commit} ) {
      commit('DEL_ALL_VIEWTAGES')
    },
    addViewTages( {commit}, viewTages ) {
      commit('ADD_VIEWTAGES', viewTages)
    }
  }
}