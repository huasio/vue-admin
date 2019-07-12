<template>
	<div id="role">
		<el-row type="flex" justify="center">
			<el-col :span="22">
				<el-row class="add-role">
					<el-button type="primary" @click="handleAddRole">{{$t('permission.role.add_role')}}</el-button>
				</el-row>
				<el-table :data="rolesList" border style="width: 100%">
					<el-table-column align="center" :label="$t('permission.role.id')" width="180">
						<template slot-scope="scope">{{scope.row.id}}</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('permission.role.name')" width="180">
						<template slot-scope="scope">{{scope.row.name}}</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('permission.role.description')">
						<template slot-scope="scope">{{scope.row.description}}</template>
					</el-table-column>
					<el-table-column :label="$t('permission.role.operation')" align="center" width="200">
						<template slot-scope="scope">
							<el-button type="primary" size="small" @click="handleEdit(scope)">{{$t('general.editor')}}</el-button>
							<el-button type="danger" size="small" @click="handleDelete(scope)">{{$t('general.delete')}}</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-dialog
			:visible.sync="dialogVisible"
			:title="dialogType==='edit'? $t('permission.role.edit'): $t('permission.role.add_role')"
		>
			<el-form :model="role" label-width="100px" label-position="left">
				<el-form-item :label="$t('permission.role.name')">
					<el-input v-model="role.name" size="small" />
				</el-form-item>
				<el-form-item :label="$t('permission.role.description')">
					<el-input
						v-model="role.description"
						:autosize="{ minRows: 2, maxRows: 4}"
						type="textarea"
						size="small"
					/>
				</el-form-item>
				<el-form-item :label="$t('permission.role.menu')">
					<el-row type="flex" justify="end">
						<el-col :span="6" class="menu-search-input">
							<transition name="el-zoom-in-center">
								<el-input
									:placeholder="$t('permission.role.search')"
									v-model="filterText"
									v-show="showSearch"
									size="mini"
								></el-input>
							</transition>
						</el-col>
						<span class="menu-search" @click="handleSearch()" :title="$t('permission.role.search')">
							<i class="el-icon-search"></i>
						</span>
					</el-row>
					<el-tree
						:data="routesData"
						:props="defaultProps"
						accordion
						node-key="path"
						show-checkbox
						class="filter-tree"
						:check-strictly="checkStrictly"
						:filter-node-method="filterNode"
						ref="tree"
					></el-tree>
				</el-form-item>
			</el-form>
			<div style="text-align:right;margin-top: 30px;">
				<el-button @click="dialogVisible = false">{{$t('permission.role.cancel')}}</el-button>
				<el-button type="primary" @click="confirmAddRole">{{$t('permission.role.confirm')}}</el-button>
			</div>
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
	import { cloneDeep } from "@/utils";
	const defaultProp = {
		name: "",
		id: "",
		description: "",
		routes: []
	};
	import path from "path";
	export default {
		data() {
			return {
				role: Object.assign({}, defaultProp),
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
				showSearch: false,
				checkStrictly: false
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
				this.routes = this.generateRoutes(res.data);
			},
			generateArr(routes) {
				let data = [];

				routes.forEach(route => {
					data.push(route);

					if (route.children) {
						const temp = this.generateArr(route.children);

						if (temp.length > 0) {
							data = [...data, ...temp];
						}
					}
				});
				return data;
			},
			handleEdit({ row }) {
				this.dialogVisible = true;
				this.dialogType = "edit";
				this.role = cloneDeep(row);
				this.checkStrictly = true;
				this.$nextTick(() => {
					const routes = row.routes;
					this.$refs.tree.setCheckedNodes(this.generateArr(routes));
					this.checkStrictly = false;
				});
			},
			handleDelete({ $index, row }) {
				this.$confirm(
					this.$t("permission.role.confirm_delete", { name: row.name }),
					{
						confirmButtonText: this.$t("permission.role.confirm"),
						cancelButtonText: this.$t("permission.role.cancel"),
						type: "warning"
					}
				)
					.then(async () => {
						await deleteRoleApi(row.id).then(res => {
							this.rolesList.splice($index, 1);
							this.$message({
								type: "success",
								message: res.message
							});
						});
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleAddRole() {
				this.role = Object.assign({}, defaultProp);
				if (this.$refs.tree) {
					this.$refs.tree.setCheckedNodes([]);
				}
				this.dialogType = "new";
				this.dialogVisible = true;
			},
			async confirmAddRole() {
				const isEdit = this.dialogType === "edit";
				const selectKeys = this.$refs.tree.getCheckedKeys();
				this.role.routes = this.generateTree(
					cloneDeep(this.serverRoutes),
					"/",
					selectKeys
				);

				if (isEdit) {
					await updateRoleApi(this.role.id, this.role);
					for (let index = 0; index < this.rolesList.length; index++) {
						if (this.rolesList[index].id === this.role.id) {
							this.rolesList.splice(
								index,
								1,
								Object.assign({}, this.role)
							);
						}
					}
				} else {
					const { data } = await addRoleApi(this.role);
					this.role.id = data.id;
					this.rolesList.push(this.role);
				}

				this.dialogVisible = false;
				const { id, name, description } = this.role;
				this.$notify({
					type: "success",
					dangerouslyUseHTMLString: true,
					message: `
		            <div>ID: ${id}</div>
		            <div>Name: ${name}</div>
		            <div>Description: ${description}</div>
		          `
				});
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
			generateRoutes(routes, basePath = "/") {
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
						name: route.name,
						path: route.path,
						title: route.meta && route.meta.title
					};

					if (route.children) {
						data.children = this.generateRoutes(
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
			},
			generateTree(routes, basePath = "/", selectKeys) {
				const res = [];

				for (const route of routes) {
					const routePath = path.resolve(basePath, route.path);

					if (route.children) {
						route.children = this.generateTree(
							route.children,
							routePath,
							selectKeys
						);
					}
					if (
						selectKeys.includes(routePath) ||
						(route.children && route.children.length >= 1)
					) {
						res.push(route);
					}
				}

				return res;
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

