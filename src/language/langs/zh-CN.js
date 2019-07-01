export default {
  'zh-CN': {
    validations: {
      user_required: '输入用户名/邮箱/手机号',
      pass_requried: '输入长度为 6-16 位的密码',
      pass_min: '密码长度小于 6 位',
      pass_max: '密码长度大于 16 位',
      caps_lock: '大写锁定',
      required: "{tag} 不能为空",
      confirm_pass_no: "确认密码与密码不匹配"
    },
    general: {
      save: '提交',
      reset: '重置',
    },
    login: {
      title: '登录',
      user: '用户名',
      pass: '密码',
      sign: '@:login.title',
      siup: '注册',
    },
    global: {
      dashboard: '@:dashboard.title',
      profile: '@:profile.title',
      permission: '@:permission.title',
      roles: '@:permission.roles.title',
      refresh: '刷新当前标签',
      down_all_tags: '关闭全部标签',
      lang: {
        title: '语言',
        languages: {
          'zh-CN': '简体中文',
          'en': 'English'
        }
      }
    },
    logout: '退出登录',
    profile: {
      title: "个人中心",
      subtitle: '基本信息',
      intro: '个人简介',
      role: '角色',
      user: '@:login.user',
      account: {
        title: '账号信息',
        phone: '手机号码',
        email: '邮箱',
        pass: '@:login.pass',
        update: '更新信息'
      },
      security: {
        title: '安全',
        old_pass: '原密码',
        new_pass: '新密码',
        confirm_pass: '确认新密码',
        update: '更新密码',
      },
    },
    dashboard: {
      title: '仪表板'
    },
    permission: {
      title: '权限管理',
      roles: {
        title: '角色列表'
      }
    }
  }
}
