
const getters = function () {
  return {
    token: state => state.user.token,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles
  }
}

export default {
  getters
}
