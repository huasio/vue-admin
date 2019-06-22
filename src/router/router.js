import Layout from '@/layout'
export const noHandleRoutes = [
  {
    path: '/redirect',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index')
  },
  {
    path: '/logout',
    hidden: true,
    component: () => import('@/views/login/logout')
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    hidden: true,
    component: () => import('@/views/error-page/401')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashdoard',
    children: [
      {
        path: '/dashdoard',
        name: 'Dashdoard',
        component: () => import('@/views/dashdoard/index'),
        meta: { title: 'Dashdoard', icon: 'dashdoard' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        name: 'Profile.index',
        component: () => import('@/views/profile/index'),
        meta: { title: 'Profile', icon: 'profile' }
      }
    ]
  }
]