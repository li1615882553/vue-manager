import Vue from 'vue'
import App from './App'
import router from '@/router'
import './permission';

import store from '@/store'
import 'axios'
Vue.prototype.$ajax = axios
import '@/permission'
// element-ui config
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// vue-fragment
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

// axios config
import axios from 'axios'

let importAll = requireContext => {
	requireContext.keys().forEach(requireContext);
}
importAll(require.context('./assets/svgSprite', false, /\.svg$/));
import Icon from './components/Icon/Icon.vue';
Vue.component('Icon',Icon);

//引入mock测试数据
import "../mock/index";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
