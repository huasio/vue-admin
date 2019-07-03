import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs/zh-CN'
import axios from 'axios'

Vue.use(VueI18n)

// 支持语言
export const lang = ['zh-CN', 'en'];

// 初始加载语言
export const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
})

// 热重载
if (module.hot) {
  module.hot.accept(['@/language/langs/zh-CN', '@/language/langs/en',], function () {
    const langFiles = require.context('./langs', false, /\.js$/)
    console.log(langFiles)
    import('@/language/langs/zh-CN').then(msgs => {
      return i18n.setLocaleMessage('zh-CN', msgs.default['zh-CN'])
    })
    import('@/language/langs/en').then(msgs => {
      return i18n.setLocaleMessage('en', msgs.default['en'])
    })
  })
}

// 预加载语言
const loadedLanguage = ['zh-CN']

function setI8nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return loadedLanguage
}

export async function loadLanguage(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguage.includes(lang)) {
      const msgs = await import(`@/language/langs/${lang}`);
      i18n.setLocaleMessage(lang, msgs.default[lang]);
      loadedLanguage.push(lang);
      return setI8nLanguage(lang);
    }
    return Promise.resolve(setI8nLanguage(lang))
  }
  return Promise.resolve(loadedLanguage)
}
