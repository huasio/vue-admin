
const getters = {
  token: state => state.user.token,
  user: state => state.user.info,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  sidebar: state => state.app.sideBarStatus,
  permission_routes: state => state.permissions.routes,
  visitedViews: state => state.tagsView.visitedViews
}

export default getters
