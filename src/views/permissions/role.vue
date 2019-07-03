<template>
	<el-col>
		<el-row class="add-role">
			<el-button type="primary">{{$t('permission.role.add_role')}}</el-button>
		</el-row>
		<el-row>
			<el-table :data="rolesList" border style="width: 100%">
				<el-table-column
					prop="role_name"
					align="center"
					:label="$t('permission.role.role_name')"
					width="180"
				></el-table-column>
				<el-table-column prop="description" align="center" :label="$t('permission.role.description')"></el-table-column>
				<el-table-column :label="$t('permission.role.operation')" align="center">
					<el-button type="primary" size="small">{{$t('general.editor')}}</el-button>
					<el-button type="danger" size="small">{{$t('general.delete')}}</el-button>
				</el-table-column>
			</el-table>
			<el-dialog :visible.sync="dialogType" :title="dialogType==='edit'?'Edit Role':'New Role'">
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
					<el-form-item label="Menus"></el-form-item>
				</el-form>
				<div style="text-align:right;"></div>
			</el-dialog>
		</el-row>
	</el-col>
</template>

<script>
	export default {
		data() {
			return {
				role: Object.assign(
					{},
					{
						role_name: "",
						description: ""
					}
				),
				rolesList: [
					{
						role_name: "系统",
						description: "系统的角色，不允许作任何修改"
					},
					{
						role_name: "后台管理员",
						description: "用于平常后台的管理，正常维护"
					},
					{
						role_name: "普通管理员",
						description: "对一些常用模块管理"
					},
					{
						role_name: "文章管理员",
						description: "对文章模块具有管理员"
					}
				],
				dialogType: true
			};
		}
	};
</script>
<style lang="scss" scoped>
	.add-role {
		padding-bottom: 20px;
		padding-top: 10px;
	}
</style>

