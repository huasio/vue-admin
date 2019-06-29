import { i18n, lang, loadLanguage } from "@/language/i18n";

const state = {
  languages: lang,
  currentLang: i18n.locale
}

const mutations = {
  SET_LANG: (state, lang) => {
    state.currentLang = lang
  }
}

const actions = {
  setLang({ commit }, lang) {
    return new Promise((resolve, reject) => {
      loadLanguage(lang).then(() => {
        commit('SET_LANG', lang)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
