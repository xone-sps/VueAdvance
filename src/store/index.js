import Vue from 'vue'
import Vuex from 'vuex';
/// import Modules
import auth from '@/store/modules/auth'
///Register vuex to vue
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth:auth(),
  }
})
