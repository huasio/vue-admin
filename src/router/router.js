/**
 * 自定义参数：
 * 1. hidden {true|false} true：隐藏不显示在左侧菜单，如果有子路由，连子路由一起隐藏  false： 则显示（默认是false，可不设置）
 * 2. alwaysShow {true|false} true：显示在左侧菜单 false： 若有一个子路由的时候，则显示子路由
 */

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
    meta: { title: "Login" },
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
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    redirect: '/profile/index',
    meta: { title: 'Profile' },
    children: [
      {
        path: '/profile/index',
        name: 'ProfileIndex',
        component: () => import('@/views/profile/index'),
        meta: { title: 'Profile', icon: 'profile' }
      }
    ]
  }
]

export const dynamicRoutes = [
  {
    path: '/permissions',
    component: Layout,
    meta: {
      title: 'Permissions', icon: 'permission',
      roles: ['admin', 'permissions', 'roles']
    },
    alwaysShow: true,
    redirect: '/permissions/roles',
    children: [
      {
        path: '/permissions/roles',
        name: 'Permissions.Roles',
        component: () => import('@/views/permissions/roles'),
        meta: { title: 'Roles', roles: ['permissions'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
