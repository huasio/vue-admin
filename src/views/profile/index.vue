<template>
	<el-container>
		<el-row class="outside-row" :gutter="20">
			<el-col :span="6" :xs="24" class="left-col">
				<el-row type="flex" justify="start">
					<User :user="user" />
				</el-row>
			</el-col>
			<el-col :span="18" :xs="24">
				<el-row type="flex" justify="end">
					<el-card class="box-card right-card">
						<el-tabs>
							<el-tab-pane :label="$t('profile.account.title')">
								<Account :user="user" />
							</el-tab-pane>
							<el-tab-pane :label="$t('profile.security.title')">
								<Security />
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</el-row>
			</el-col>
		</el-row>
	</el-container>
</template>

<script>
	import { mapGetters } from "vuex";
	import User from "./components/User";
	import Account from "./components/Account";
	import Security from "./components/Security";
	export default {
		components: {
			User,
			Account,
			Security
		},
		data() {
			return {};
		},
		computed: {
			...mapGetters(["user", "roles"]),
		}
	};
</script>

<style lang="scss" scoped>
	.outside-row,
	.box-card {
		width: 100%;
	}
	.left-col {
		margin-bottom: 30px;
	}
</style>
