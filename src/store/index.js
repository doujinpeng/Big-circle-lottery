import Vue from 'vue'
import Vuex from 'vuex'
import states from './states'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  states,
  mutations,
  getters,
  actions
})