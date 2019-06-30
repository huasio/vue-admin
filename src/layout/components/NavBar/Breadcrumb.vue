<template>
	<el-breadcrumb separator="/" class="app-breadcrumb">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in items" :key="item.path">
				<span
					v-if="item.redirect==='noRedirect' || index===items.length-1 || (item.redirect && item.redirect === $route.path)"
					class="no-redirect"
				>{{handleLang(item.meta.title)}}</span>
				<a v-else @click.prevent="handleLink(item)">{{handleLang(item.meta.title)}}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
	import pathToRegexp from "path-to-regexp";
	export default {
		data() {
			return {
				items: null
			};
		},
		// 初始化标签页
		created() {
			this.getBreadcrumb();
		},
		watch: {
			// 监听路由变化
			$route(route) {
				// redirect 除外
				if (route.path.startsWith("/redirect/")) {
					return;
				}
				// 获取标签
				this.getBreadcrumb();
			}
		},
		methods: {
			handleLang(title) {
				return this.$t(`global.${title.trim().toLocaleLowerCase()}`);
			},
			// 获取标签
			getBreadcrumb() {
				var tmp = [];
				// 获取匹配的所有路由
				let matched = this.$route.matched.filter(item => {
					const bool =
						item.meta &&
						item.meta.title &&
						item.meta.breadcrumb !== false;

					if (bool && !tmp.includes(item.meta.title)) {
						item.meta && tmp.push(item.meta.title);
						return true;
					}
					return false;
				});
				const first = matched[0];
				// 确保 dashboard 是第一个
				if (!this.isDashdoard(first)) {
					matched = [
						{
							path: "/dashboard",
							name: "Dashboard",
							meta: { title: "Dashboard" }
						}
					].concat(matched);
				}
				this.items = matched;
			},
			isDashdoard(route) {
				const name = route && route.name;
				if (!name) {
					return false;
				}
				return name.trim().toLocaleLowerCase() === "dashboard";
			},
			// 解析参数
			pathCompile(path) {
				const { params } = this.$route;
				var toPath = pathToRegexp.compile(path);
				return toPath(params);
			},
			// 处理 path '/user/:id'
			// 将 id 转为有效的 url
			handleLink(item) {
				const { redirect, path } = item;
				if (redirect) {
					this.$router.push(redirect);
					return;
				}
				this.$router.push(this.pathCompile(path));
			}
		}
	};
</script>

<style lang="scss" scoped>
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;
		font-size: 14px;
		line-height: 50px;
		margin-left: 8px;

		.no-redirect {
			color: #97a8be;
			cursor: text;
		}
	}
	.el-breadcrumb {
		line-height: 60px !important;
	}

	/* breadcrumb transition */
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
		transition: all 0.5s;
	}

	.breadcrumb-enter,
	.breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(20px);
	}

	.breadcrumb-move {
		transition: all 0.5s;
	}

	.breadcrumb-leave-active {
		position: absolute;
	}
	.no-redirect {
		color: #97a8be;
	}
	.el-breadcrumb__inner a {
		font-weight: 500 !important;
	}
</style>
