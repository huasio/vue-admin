import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const moduleFiles = require.context('./modules', true, /\.js$/)

const modules = moduleFiles.keys().reduce((modules, path) => {
  var name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
  var value = moduleFiles(path)

  modules[name] = value.default

  return modules
}, {})

const state = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
