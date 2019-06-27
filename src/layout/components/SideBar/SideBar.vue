<template>
	<div v-if="!item.hidden" class="menu-wrapper">
		<!-- 第一种情况 -->
		<!-- 当  current item 只有一个 children，检测是否将 children 作为根目录显示 -->
		<!-- 检查条件为：有且仅有一个 children，并且没有children && alwayShow 为 false -->

		<!-- 第二种情况 -->
		<!-- current 没有children 将自身作为 onlyOneShow 返回 -->
		<!-- 这种是 item 是有效菜单 -->
		<template
			v-if="hasShowChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowChild) && !item.alwaysShow"
		>
			<Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
				<el-menu-item :index="resolvePath(onlyOneChild.path)">
					<i class="el-icon-location"></i>
					<span slot="title">{{onlyOneChild.meta.title}}</span>
				</el-menu-item>
			</Link>
		</template>

		<!-- 若是没有需要显示 item 那么继续处理children -->
		<el-submenu v-else :index="resolvePath(item.path)">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span v-if="item.meta" slot="title">{{item.meta.title}}</span>
			</template>
			<SideBar
				v-for="child in item.children"
				:key="child.path"
				:item="child"
				:base-path="resolvePath(child.path)"
			/>
		</el-submenu>
	</div>
</template>

<script>
	import path from "path";
	import Link from "./Link";
	import { isExternal } from "@/utils/validations";
	export default {
		name: "SideBar",
		props: {
			item: {
				type: Object,
				default: {}
			},
			// 作为 children 前面部分 url
			// 可能也是外链
			basePath: {
				type: String,
				default: ""
			}
		},
		components: {
			Link
		},
		data() {
			// 临时存放 children item
			// 只有当 children 有且仅有一个时有效
			this.onlyOneChild = null;
			return {
				// onlyOneChild: null
			};
		},
		methods: {
			hasShowChild(children = [], current) {
				// 过滤隐藏的路由
				const showChild = children.filter(item => {
					if (item.hidden) {
						return false;
					} else {
						this.onlyOneChild = item;
						return true;
					}
				});

				// 若是 children 只有一个，则返回
				// 进一步判断是否显示 children 作为根菜单
				if (showChild.length === 1) {
					return true;
				}

				// 没有 children 将 current item 作为结果返回
				if (showChild.length === 0) {
					this.onlyOneChild = { ...current, path: "", noShowChild: true };
					return true;
				}

				// 不止一个 children
				return false;
			},

			resolvePath(url) {
				// 检查当前 item path 是否是外链
				if (isExternal(url)) {
					return url;
				}
				// 检查父 item path 是否为外链
				if (isExternal(this.basePath)) {
					return this.basePath;
				}

				// 返回当前 父 path + item path
				// or 返回 当前 path + ''
				return path.resolve(this.basePath, url);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.el-menu--collapse {
		.el-submenu {
			& > .el-submenu__title {
				& > span {
					height: 0;
					width: 0;
					overflow: hidden;
					visibility: hidden;
					display: inline-block;
				}
			}
		}
	}
</style>
