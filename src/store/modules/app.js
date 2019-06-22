import { set } from '@/utils/cookie'

const state = {
  sideBarStatus: false
}

const mutations = {
  SET_SIDEBAR_STATUS: (state) => {
    state.sideBarStatus = !state.sideBarStatus
    if (state.sideBarStatus === true) {
      set('sideBarStatus', 1)
    } else {
      set('sideBarStatus', 0)
    }
  }
}
const actions = {

  toggleSideBar ({ commit }) {
    commit('SET_SIDEBAR_STATUS')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
