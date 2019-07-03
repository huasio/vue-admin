import { getToken, removeToken, setToken } from '@/utils/auth'
import { getInfoApi, loginApi, logoutApi, updateApi } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken(),
  info: {},
  roles: [],
  permissions: []
}
const mutations = {
  SET_USER_INFO: function (state, data) {
    state.info = data
  },
  SET_TOKEN: function (state, token) {
    state.token = token
  },
  SET_ROLES: function (state, roles) {
    state.roles = roles
  },
  SET_PERMISSIONS: function (state, permissions) {
    state.permissions = permissions
  },
}
const actions = {
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoApi(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登陆！')
        }
        commit('SET_USER_INFO', data)
        commit('SET_ROLES', data.roles)
        commit('SET_PERMISSIONS', data.permissions)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_PERMISSIONS', [])
      removeToken()
      resolve()
    })
  },
  login({ commit }, info) {
    return new Promise((resolve, reject) => {
      loginApi({ user: info.user.trim(), pass: info.pass.trim() }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        delete data.token
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ dispatch, state }) {
    return new Promise((resolve, reject) => {
      logoutApi(state.token).then(() => {
        dispatch('resetToken')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  update({ commit }, payload) {
    return new Promise((resolve, reject) => {
      updateApi(state.token, payload).then(response => {
        let tmp = {}
        for (const [key, value] of Object.entries(response.data)) {
          if (state.info.hasOwnProperty(key)) {
            tmp[key] = value
          }
        }
        commit('SET_USER_INFO', Object.assign(state.info, tmp))
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updatePass({ state }, data) {
    return new Promise((resolve, reject) => {
      updateApi(state.token, data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })

  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
