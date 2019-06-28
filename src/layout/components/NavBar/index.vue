<template>
	<el-row type="flex" justify="space-around">
		<el-col class="hamburger">
			<Hamburger @toggleClick="toggleSideBar" :status="sidebar"/>
		</el-col>
		<el-col :sm="{span:16}" :xs="{span:0}">
			<Breadcrumb/>
		</el-col>
		<el-col :sm="{span:7}" :xs="{span:22}">
			<el-menu
				:default-active="active"
				class="el-menu-demo"
				mode="horizontal"
				@select="handleSelect"
				:router="true"
			>
				<el-submenu index="4-1">
					<template slot="title">
						<img :src="avatar" class="avatar" width="40" height="40" alt>
					</template>
					<el-menu-item index="/profile/index">个人中心</el-menu-item>
					<el-menu-item @click="logout">退出</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	import Hamburger from "@/components/Hamburger";
	import Breadcrumb from "./Breadcrumb";
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {};
		},
		components: {
			Hamburger,
			Breadcrumb
		},
		computed: {
			...mapGetters(["sidebar", "avatar"]),
			active() {
				return this.$route.path;
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			toggleSideBar() {
				this.$store.dispatch("app/toggleSideBar");
			},
			async logout() {
				await this.$store.dispatch("user/logout");
				this.$router.replace({
					path: `/login?redirect=${this.$route.fullPath}`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.el-menu-demo {
		display: flex;
		justify-content: flex-end;
	}
	.avatar {
		border-radius: 6px;
	}
	.hamburger {
		flex: 1;
		text-align: center;
		min-width: 50px;
		margin-right: 10px;
	}
	.el-menu.el-menu--horizontal {
		border-bottom: none;
	}
	.el-menu {
		background-color: initial !important;
	}
</style>
