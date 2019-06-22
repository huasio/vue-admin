<template>
	<div style="height:100vh; overflow:hidden;">
		<div class="logo">logo</div>
		<el-scrollbar style="height:100%;">
			<el-menu
				:default-active="activeMenu"
				class="el-menu-vertical-demo"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				:collapse="sidebar"
				mode="vertical"
			>
				<SideBar v-for="child in permission_routes" :key="child.path" :item="child"/>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideBar from './SideBar'
export default {
  components: {
    SideBar
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes']),
    activeMenu () {
      const { meta, path } = this.$route

      if (meta.activeMenu) {
        return meta.activeMenu
      }

      return path
    }
  },
  methods: {}
}
</script>

<style scoped>
	.el-menu {
		border: none !important;
	}
	.logo {
		height: 60px;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
