import { noHandleRoutes, dynamicRoutes } from '@/router/router'

/**
 *  判断是否拥有权限
 * @param {array} route 路由规则
 * @param {array} roles 用户路由权限
 * @return {bool} true|false
 */
function hasPermissions (route, permissions) {
  if (route.meta && route.meta.permissions) {
    return permissions.some(role => route.meta.permissions.includes(role))
  } else {
    return true
  }
}

/**
 *  过滤权限
 * @param {object} routes 路由规则
 * @param {array} roles 用户路由规则
 */
function filterRoutes (routes, permissions) {
  const res = []

  routes.forEach(route => {
    if (hasPermissions(route, permissions)) {
      const tmp = { ...route }
      if (route.children) {
        tmp.children = filterRoutes(route.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = noHandleRoutes.concat(routes)
  }
}

const actions = {
  generateRouter ({ commit }, permissions) {
    return new Promise((resolve, reject) => {
      let accessRoutes
      if (permissions.includes('admin')) {
        accessRoutes = dynamicRoutes || []
      } else {
        accessRoutes = filterRoutes(dynamicRoutes, permissions)
      }

      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
