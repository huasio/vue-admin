import Vue from 'vue'
import Router from 'vue-router'
import { noHandleRoutes } from './router'

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history',
  routes: noHandleRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router