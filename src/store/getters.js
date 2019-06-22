
const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  sidebar: state => state.app.sideBarStatus,
  permission_routes: state => state.permissions.routes
}

export default getters
