import router from './index'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'

/**
 * 有几种情况：
 * 1. 已经登陆了访问登陆页面，需要跳转到首页
 * 2. 有 token 的，检测是否已经获取用户路由规则，如果已经获取，那么 next
 * 3. 没有路由规则，则获取用户信息，根据用户权限，动态加载路由，并且与之前的路由合并
 * 4. 没有token，需要登陆的，带着来源地址，登录之后跳转回来
 * 5. 免登录白名单，则直接 next
 * 6. 若是遇到意外错误，则清空 token 避免进入无限循环
 */
NProgress.configure({ showSpinner: false, speed: 1000 })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = to.meta.title && to.meta.title + ' - 后台管理' || '后台管理'

  const hasToken = getToken()

  if (hasToken) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      const hasPermissions = store.getters.permissions && store.getters.permissions.length > 0

      if (hasPermissions) {
        next()
      } else {
        try {
          const { permissions } = await store.dispatch('user/getInfo')

          const generateRouter = await store.dispatch('permissions/generateRouter', permissions)

          router.addRoutes(generateRouter)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || '全局前置钩子这里有误')
          next()

          next({ path: `/login?redirect=${to.path}` })
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next()
      next({ path: `/login?redirect=${to.path}` })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
