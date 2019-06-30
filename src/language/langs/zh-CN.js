export default {
  'zh-CN': {
    general: {
      save: '提交',
      reset: '重置',
      refresh: '刷新当前标签',
      down_all_tags: '关闭全部标签',
      lang: {
        title: '语言',
        languages: {
          'zh-CN': '简体中文',
          'en-US': 'English'
        }
      },
    },
    login: {
      title: '登录',
      user: '用户名',
      pass: '密码',
      sign: '@:login.title',
      siup: '注册',
      message: {
        user_required: '输入用户名/邮箱/手机号',
        pass_requried: '输入长度为 6-16 位的密码',
        pass_min: '密码长度小于 6 位',
        pass_max: '密码长度大于 16 位',
        caps_lock: '大写锁定',
      }
    },
    global: {
      dashboard: '@:dashboard.title',
      profile: '@:profile.user',
      permission: '@:permission.title',
      roles: '@:permission.roles'
    },
    logout: '退出登录',
    profile: {
      user: "个人中心",
      subtitle: '基本信息',
      intro: '个人简介',
      role: '角色',
      user_name: '@:login.user',
      account: '账号信息',
      phone: '手机号码',
      email: '邮箱',
      pass: '@:login.pass',
      update: '更新信息'
    },
    security: {
      title: '安全',
      old_pass: '旧密码',
      new_pass: '新密码',
      repeat_pass: '确认新密码',
      update: '更新密码'
    },
    dashboard: {
      title: '仪表板'
    },
    permission: {
      title: '权限管理',
      roles: '角色列表'
    }
  }
}
