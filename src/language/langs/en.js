export default {
  'en': {
    validations: {
      user_required: 'Enter username/email/phone number',
      pass_requried: 'Enter a password of 6-16 bits in length',
      pass_min: 'Password length is less than 6 bits',
      pass_max: 'Password length is greater than 16 bits',
      caps_lock: 'Caps lock',
      required: "{tag} 不能为空"
    },
    general: {
      save: 'Save',
      reset: 'Reset',
      editor: 'Editor',
      delete: 'Delete',
      add: 'Add'
    },
    login: {
      title: 'Login',
      user: 'User',
      pass: 'Password',
      sign: '@:login.title',
      siup: 'Register',
    },
    global: {
      dashboard: '@:dashboard.title',
      profile: '@:profile.title',
      permission: '@:permission.title',
      role: '@:permission.role.title',
      refresh: 'Refresh current tag',
      down_all_tags: 'Shut down all tags',
      lang: {
        title: 'Language',
        languages: {
          'zh-CN': '简体中文',
          'en': 'English'
        }
      }
    },
    logout: 'Logout',
    profile: {
      title: "Profile",
      subtitle: 'Base information',
      intro: 'Introduction',
      role: 'Role',
      user: '@:login.user',
      account: {
        title: 'Account',
        phone: 'Phone',
        email: 'Email',
        update: 'Update account',
      },
      security: {
        title: 'Security',
        old_pass: 'Old password',
        new_pass: 'New password',
        confirm_pass: 'Confirm new password',
        update: 'Update password'
      },
    },
    dashboard: {
      title: 'Dashboard'
    },
    permission: {
      title: 'Permission',
      role: {
        title: 'Role',
        name: 'Role Name',
        description: 'Description',
        operation: 'Operation',
        add_role: 'New Role',
        edit: 'Edit Role',
        cancel: 'Cancel',
        confirm: 'Confirm',
        confirm_delete: 'Confirm delete {name} ？',
        search: 'Enter keywords for filtering',
        menu: 'Menu',
      }
    }
  }
}
