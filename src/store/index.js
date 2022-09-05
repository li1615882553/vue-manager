import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'

Vue.use(Vuex);

const modulesWebpackContext = require.context('./modules', true, /\.js$/);

const modules =  modulesWebpackContext.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesWebpackContext(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store;