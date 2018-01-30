import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import eg from './modules/eg'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    eg
  }
})
