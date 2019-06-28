const state = {
  visitedViews: [],
  cachedViews: []
}
const mutations = {
  // 添加 标签
  ADD_VIEW: (state, view) => {
    if (state.visitedViews.some(sv => sv.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  // 添加 需要缓存的页面
  ADD_CACHE_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (view.meta.noCache) return
    state.cachedViews.push(view.name)
  },
  // 删除 标签
  DELETE_VIEW: (state, view) => {

    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
      }
    }
  },
  // 删除 所有标签
  DELETE_ALL_VIEW: (state) => {
    const affixViews = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixViews
  },
  // 删除 缓存
  DELETE_CACHE_VIEW: (state, view) => {
    for (const i in state.cachedViews) {
      const index = state.cachedViews.indexOf(i)
      if (i === view.name) {
        state.visitedViews.splice(index, 1)
        break
      }
    }
  },
  // 删除 所有缓存
  DELETE_ALL_CACHE_VIEW: (state) => {
    state.cachedViews = []
  }
}
const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCacheView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VIEW', view)
  },
  addCacheView({ commit }, view) {
    commit('ADD_CACHE_VIEW', view)
  },
  deleteView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('deleteVisitedView', view)
      dispatch('deleteCacheView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  deleteVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DELETE_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  deleteCacheView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DELETE_CACHE_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  deleteAllViews({ commit }) {
    commit('DELETE_ALL_VIEW')
    commit('DELETE_ALL_CACHE_VIEW')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
