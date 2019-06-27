<template>
	<el-row>
		<el-col :span="18">
			<el-tabs v-model="active" @tab-remove="closeSelectTag">
				<el-tab-pane
					v-for="tag of visitedViews"
					:key="tag.path"
					:name="tag.name"
					:closable="tag.meta && !tag.meta.affix"
					ref="tag"
				>
					<template slot="label">
						<router-link :to="tag.path" tag="span" class="c">{{tag.title}}</router-link>
					</template>
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<el-col :span="6" class="border-color">
			<el-row type="flex" justify="end" class="tag-span">
				<el-badge class="item">
					<el-button size="small" @click.native="refreshSelectTag()" plain>刷新</el-button>
				</el-badge>
				<el-badge :value="visitedViews.length" class="item">
					<el-button size="small" type="danger" @click.native="closeAllViews" plain>关闭全部</el-button>
				</el-badge>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import path from "path";
	export default {
		data() {
			return {
				active: "Dashboard",
				affixTags: [],
				currentSelectTag: {}
			};
		},
		computed: {
			...mapGetters({
				routes: "permission_routes",
				visitedViews: "visitedViews"
			})
		},
		watch: {
			$route() {
				this.addTag();
			}
		},
		methods: {
			...mapActions("tagsView", [
				"addView",
				"addVisitedView",
				"deleteView",
				"deleteCacheView",
				"deleteAllViews"
			]),
			initTags() {
				const affixTags = (this.affixTags = this.filterAffix(this.routes));
				for (const tag of affixTags) {
					if (tag.name) {
						this.addVisitedView(tag);
					}
				}
			},
			addTag() {
				const { name } = this.$route;
				if (name) {
					this.$store.dispatch("tagsView/addView", this.$route);
				}
				this.active = this.$route.name;
			},
			filterAffix(routes, basePath = "/") {
				let tags = [];

				routes.forEach(route => {
					if (route.meta && route.meta.affix) {
						const toPath = path.resolve(basePath, route.path);
						tags.push({
							fullPath: toPath,
							path: toPath,
							name: route.name,
							meta: { ...route.meta }
						});
					}

					if (route.children) {
						const tmpTags = this.filterAffix(
							route.children,
							route.path
						);

						if (tmpTags.length > 0) {
							tags = [...tags, ...tmpTags];
						}
					}
				});
				return tags;
			},
			isActive(route) {
				return route.path === this.$route.path;
			},
			closeSelectTag(name) {
				this.visitedViews.forEach((view, index) => {
					if (view.name === name) {
						this.deleteView(view).then(({ visitedViews }) => {
							if (this.isActive(view)) {
								this.toNextView(visitedViews, view, index);
							}
						});
					}
				});
			},
			toNextView(visitedViews, view, parentIndex) {
				const nextView =
					visitedViews[parentIndex] ||
					visitedViews[parentIndex - 1] ||
					visitedViews[0];
				if (nextView && nextView.name !== "Dashboard") {
					this.$router.push(nextView);
					this.active = nextView.name;
				} else {
					if (view.name === "Dashboard") {
						this.$router.replace({ path: "/redirect" + view.fullPath });
					} else {
						this.$router.push("/");
					}
				}
			},
			closeAllViews() {
				this.deleteAllViews();
				if (this.affixTags.some(tag => tag.path === this.$route.path)) {
					return;
				}
				this.toNextView(this.affixTags, this.currentSelectTag, null);
			},
			refreshSelectTag() {
				this.deleteCacheView(this.$route);
				const { fullPath } = this.$route;
				this.$router.replace({
					path: "/redirect" + fullPath
				});
			}
		},
		mounted() {
			this.initTags();
			this.addTag();
		}
	};
</script>
<style lang="scss">
	.el-tabs__item {
		height: initial;
		line-height: initial;
	}
	.tag-span .item:nth-child(1) {
		margin-right: 6px;
	}
	.tag-span {
		.item:nth-child(1) {
			margin-right: 6px;
		}
	}
	.border-color {
		height: 40px;
		line-height: 40px;
		border-bottom: 2px solid #e4e7ed;
	}
</style>
