<template>
	<div id="account">
		<el-form :model="accountForm" :rules="rules" ref="accountForm">
			<el-form-item :label="$t('profile.user')" prop="name">
				<el-input
					type="text"
					ref="name"
					v-model="accountForm.name"
					tabindex="1"
					maxlength="21"
					show-word-limit
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.account.phone')" prop="phone">
				<el-input
					type="text"
					v-model.number="accountForm.phone"
					tabindex="2"
					ref="phone"
					maxlength="11"
					show-word-limit
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.account.email')" prop="email">
				<el-input
					type="text"
					tabindex="3"
					ref="email"
					v-model="accountForm.email"
					maxlength="66"
					show-word-limit
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.intro')" prop="intro">
				<el-input
					type="textarea"
					tabindex="4"
					ref="intro"
					:autosize="{ minRows: 2, maxRows: 6}"
					v-model="accountForm.intro"
					maxlength="66"
					show-word-limit
				></el-input>
			</el-form-item>
			<el-form-item class="update-btn">
				<el-button
					type="primary"
					@click="submitForm"
					:loading="loading"
				>{{$t('profile.account.update')}}</el-button>
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
						name: "",
						introduction: "",
						phone: "",
						email: ""
					};
				}
			}
		},
		data() {
			var validateName = (rule, value, callback) => {
				callback();
			};
			var validatePhone = (rule, value, callback) => {
				callback();
			};
			var validateEmail = (rule, value, callback) => {
				callback();
			};
			return {
				accountForm: {
					intro: this.user.introduction,
					name: this.user.name,
					phone: this.user.phone,
					email: this.user.email
				},
				rules: {
					name: [{ validator: validateName, trigger: "blur" }],
					phone: [{ validator: validatePhone, trigger: "blur" }],
					email: [{ validator: validateEmail, trigger: "blur" }]
				},
				loading: false
			};
		},
		methods: {
			submitForm() {
				this.$refs.accountForm.validate((valid, obj) => {
					if (valid) {
						this.loading = true;
						this.$store
							.dispatch("user/update", this.accountForm)
							.then(res => {
								this.loading = false;
								if (res.code === 20000) {
									var msg = {
										title: "成功",
										type: "success"
									};
								} else {
									var msg = {
										title: "错误",
										type: "error"
									};
								}
								this.$notify({
									...msg,
									message: res.message
								});
							})
							.catch(error => {
								this.loading = false;
								console.log(error);
							});
						this.$refs.accountForm.clearValidate();
					} else {
						for (const [key, value] of Object.entries(obj)) {
							this.$refs.accountForm.validateField(key);
						}
					}
				});
			}
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
