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
				<Lang
					:current-lang="currentLang"
					:languages="languages"
					@clickLang="clickLang"
					:title="$t('general.lang.title')"
				/>
				<el-submenu index="4-1">
					<template slot="title">
						<img :src="avatar" class="avatar" width="40" height="40" alt>
					</template>
					<el-menu-item index="/profile/index">{{$t('profile.user')}}</el-menu-item>
					<el-menu-item @click="logout" index>{{$t('logout')}}</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	import Hamburger from "@/components/Hamburger";
	import Lang from "@/components/Language";
	import Breadcrumb from "./Breadcrumb";
	import { mapGetters, mapState, mapActions } from "vuex";
	export default {
		data() {
			return {};
		},
		components: {
			Hamburger,
			Breadcrumb,
			Lang
		},
		computed: {
			...mapState("lang", ["languages", "currentLang"]),
			...mapGetters(["sidebar", "avatar"]),
			active() {
				return this.$route.path;
			}
		},
		methods: {
			...mapActions("lang", ["setLang"]),
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
			},

			clickLang(lang) {
				this.setLang(lang);
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
