<template>
	<div id="role">
		<el-row type="flex" justify="center">
			<el-col :span="22">
				<el-row class="add-role">
					<el-button type="primary" @click="handleAddRole">{{$t('permission.role.add_role')}}</el-button>
				</el-row>
				<el-table :data="rolesList" border style="width: 100%">
					<el-table-column align="center" :label="$t('permission.role.role_name')" width="180">
						<template slot-scope="scope">{{scope.row.name}}</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('permission.role.description')">
						<template slot-scope="scope">{{scope.row.description}}</template>
					</el-table-column>
					<el-table-column :label="$t('permission.role.operation')" align="center" width="150">
						<template slot-scope="scope">
							<el-button type="primary" size="small" @click="handleEdit(scope)">{{$t('general.editor')}}</el-button>
							<el-button type="danger" size="small" @click="handleDelete(scope)">{{$t('general.delete')}}</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
			<el-form :model="role" label-width="80px" label-position="left">
				<el-form-item label="Name">
					<el-input v-model="role.role_name" placeholder="Role Name" />
				</el-form-item>
				<el-form-item label="Desc">
					<el-input
						v-model="role.description"
						:autosize="{ minRows: 2, maxRows: 4}"
						type="textarea"
						placeholder="Role Description"
					/>
				</el-form-item>
				<el-form-item label="Menus">
					<el-row type="flex" justify="end">
						<el-col :span="6" class="menu-search-input">
							<transition name="el-zoom-in-center">
								<el-input placeholder="输入关键字进行过滤" v-model="filterText" v-show="showSearch" size="mini"></el-input>
							</transition>
						</el-col>
						<span class="menu-search" @click="handleSearch()">
							<i class="el-icon-search"></i>
						</span>
					</el-row>
					<el-tree
						:data="routesData"
						:props="defaultProps"
						accordion
						show-checkbox
						class="filter-tree"
						:filter-node-method="filterNode"
						ref="tree"
					></el-tree>
				</el-form-item>
			</el-form>
			<div style="text-align:right;"></div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getRolesApi,
		getRoutesApi,
		addRoleApi,
		updateRoleApi,
		deleteRoleApi
	} from "@/api/role";
	const defaultProp = {
		role_name: "",
		description: "",
		routes: []
	};
	import path from "path";
	export default {
		data() {
			return {
				role: Object.assign({}, defaultProp),
				data: [],
				rolesList: [],
				serverRoutes: [],
				routes: [],
				dialogVisible: false,
				dialogType: "new",
				defaultProps: {
					label: "title",
					children: "children"
				},
				filterText: "",
				showSearch: false
			};
		},
		computed: {
			routesData() {
				return this.routes;
			}
		},
		created() {
			this.getRoles();
			this.getRoutes();
		},
		methods: {
			async getRoles() {
				const res = await getRolesApi();
				this.rolesList = res.data;
			},
			async getRoutes() {
				const res = await getRoutesApi();
				this.serverRoutes = res.data;
				this.routes = this.generalRoutes(res.data);
			},
			handleEdit(row) {},
			handleDelete(row) {},
			handleAddRole() {
				this.dialogVisible = true;
				this.role = Object.assign({}, defaultProp);
			},
			filterNode(value, data) {
				if (!value) return true;
				return (
					data.title
						.toLocaleLowerCase()
						.indexOf(value.toLocaleLowerCase()) !== -1
				);
			},
			handleSearch() {
				this.showSearch = !this.showSearch;
			},
			generalRoutes(routes, basePath = "/") {
				const res = [];

				if (!routes) {
					return res;
				}
				for (let route of routes) {
					if (route.hidden) {
						continue;
					}
					const onlyOneChild = this.onlyOneChild(route.children, route);

					if (onlyOneChild && !route.alwaysShow) {
						route = onlyOneChild;
					}

					const data = {
						path: route.path,
						title: route.meta && route.meta.title
					};

					if (route.children) {
						data.children = this.generalRoutes(
							route.children,
							data.path
						);
					}
					res.push(data);
				}
				return res;
			},
			onlyOneChild(children, parent) {
				let onlyOneChild = null;

				if (!children) {
					return false;
				}

				const showChild = children.filter(item => !item.hidden);

				if (showChild.length === 1) {
					onlyOneChild = showChild[0];
					onlyOneChild.path = path.resolve(
						parent.path,
						onlyOneChild.path
					);
					return onlyOneChild;
				}
				if (showChild.length === 0) {
					onlyOneChild = { ...parent, path: "", noShowChild: true };
					return onlyOneChild;
				}
				return false;
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.add-role {
		padding-bottom: 20px;
		padding-top: 10px;
	}
	.menu-search {
		margin-left: 6px;
		font-size: 22px;
		cursor: pointer;
	}
	.menu-search-input {
		height: 28px !important;
	}
</style>

