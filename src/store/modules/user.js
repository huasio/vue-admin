import { getToken, removeToken } from '@/utils/auth'
import { getInfoApi } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  introduction: '',
  avatar: 'https://img2.woyaogexing.com/2019/06/19/8cf8bd34f2ae40889c0d0e77e126cf87!400x400.jpeg',
  roles: []
}

const mutations = {
  SET_TOKEN: function (state, paylaod) {
    state.token = paylaod
  },
  SET_ROLES: function (state, payload) {
    state.roles = payload
  },
  SET_NAME: function (state, payload) {
    state.name = payload
  },
  SET_INTRODUCTION: function (state, payload) {
    state.introduction = payload
  },
  SET_AVATAR: function (state, payload) {
    state.avatar = payload
  }
}

/**
 * 返回一个 Promise 对象
 * 调用用户用信息接口，传入 token 以获取用户信息
 */
const actions = {
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoApi(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登陆！')
        }

        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_INTRODUCTION', data.introduction)
        commit('SET_AVATAR', data.avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch('resetToken')
      resetRouter()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
