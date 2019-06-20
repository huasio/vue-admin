import { noHandleRoutes, dynamicRoutes } from '@/router/router'

/**
 *  判断是否拥有权限
 * @param {array} route 路由规则
 * @param {array} roles 用户路由权限
 * @return {bool} true|false
 */
function hasPermissions(route, roles) {

  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }

}


/**
 *  过滤权限
 * @param {object} routes 路由规则
 * @param {array} roles 用户路由规则
 */
function filterRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {

    if (hasPermissions(route, roles)) {
      const tmp = { ...route }
      if (route.children) {
        tmp.children = filterRoutes(route.children, roles)
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
  generateRouter({ commit }, roles) {

    return new Promise((resolve, reject) => {
      let accessRoutes
      if (roles.includes('admin')) {
        accessRoutes = dynamicRoutes || []
      } else {
        accessRoutes = filterRoutes(dynamicRoutes, roles)
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
