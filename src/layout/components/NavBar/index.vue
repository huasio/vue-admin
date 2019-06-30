<template>
	<el-row type="flex" justify="space-around">
		<el-col class="hamburger">
			<Hamburger @toggleClick="toggleSideBar" :status="sidebar" />
		</el-col>
		<el-col :sm="{span:16}" :xs="{span:0}">
			<Breadcrumb />
		</el-col>
		<el-col :sm="{span:7}" :xs="{span:22}">
			<el-row type="flex" justify="end">
				<Lang
					:current-lang="currentLang"
					:languages="languages"
					@clickLang="clickLang"
					:title="$t('general.lang.title')"
				/>

				<el-dropdown trigger="click" class="avatar-dropdown" @command="handleDropdown">
					<span class="el-dropdown-link">
						<img :src="avatar" class="avatar" width="40" height="40" alt />
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<Link to="/profile/index">
							<el-dropdown-item>{{$t('profile.user')}}</el-dropdown-item>
						</Link>
						<el-dropdown-item command="logout" divided>{{$t('logout')}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
	import Hamburger from "@/components/Hamburger";
	import Lang from "@/components/Language";
	import Breadcrumb from "./Breadcrumb";
	import { mapGetters, mapState, mapActions } from "vuex";
	import Link from "@/components/Link";
	export default {
		data() {
			return {};
		},
		components: {
			Hamburger,
			Breadcrumb,
			Lang,
			Link
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
			async handleDropdown(command) {
				if (command === "logout") {
					await this.$store.dispatch("user/logout");
					this.$router.replace({
						path: `/login?redirect=${this.$route.fullPath}`
					});
				}
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
	.avatar-dropdown {
		border-radius: 6px;
		padding-top: 9px;
		margin-right: 10px;
		margin-left: 20px;
		cursor: pointer;
	}
	.el-popper {
		padding: 6px 0 !important;
		margin-top: 0 !important;
		a {
			text-decoration: none !important;
		}
		.el-dropdown-menu__item--divided {
			margin-top: 0px;
		}
		.el-dropdown-menu__item--divided:before {
			height: 0px;
		}
	}
</style>
