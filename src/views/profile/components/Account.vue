<template>
	<div id="account">
		<el-form>
			<el-form-item :label="$t('profile.user_name')">
				<el-input type="text" v-model="name" maxlength="21" show-word-limit></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.phone')">
				<el-input type="text" v-model="phone" maxlength="11" show-word-limit></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.email')">
				<el-input type="text" v-model="email" maxlength="66" show-word-limit></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.intro')">
				<el-input
					type="textarea"
					:autosize="{ minRows: 2, maxRows: 6}"
					v-model="intro"
					maxlength="66"
					show-word-limit
				></el-input>
			</el-form-item>
			<el-form-item class="update-btn">
				<el-button type="primary">{{$t('profile.update')}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			user: {
				type: Object,
				default: () => {
					return {
						avatar: "",
						name: "",
						role: "",
						introduction: "",
						phone: "",
						email: ""
					};
				}
			}
		},
		data() {
			return {
				intro: this.user.introduction,
				name: this.user.name,
				phone: this.user.phone,
				email: this.user.email
			};
		}
	};
</script>

<style lang="scss" scoped>
	#account {
		.el-form-item {
			margin-bottom: 8px;
		}
		.update-btn {
			margin-top: 30px;
		}
	}
</style>
