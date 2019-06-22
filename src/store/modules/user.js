import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  introduction: '',
  avatar: '',
  roles: []
}

const mutations = {

}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
