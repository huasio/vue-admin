<template>
	<div id="Security">
		<el-form :model="form" ref="form" status-icon :rules="rules">
			<el-form-item :label="$t('profile.security.old_pass')" prop="oldPass">
				<el-input
					type="password"
					maxlength="16"
					ref="oldPass"
					tabindex="1"
					autocomplete="on"
					show-word-limit
					v-model="form.oldPass"
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.security.new_pass')" prop="newPass">
				<el-input
					type="password"
					maxlength="16"
					ref="newPass"
					tabindex="2"
					autocomplete="on"
					show-word-limit
					v-model="form.newPass"
				></el-input>
			</el-form-item>
			<el-form-item :label="$t('profile.security.confirm_pass')" prop="confirmPass">
				<el-input
					type="password"
					maxlength="16"
					ref="confirmPass"
					tabindex="3"
					autocomplete="on"
					show-word-limit
					v-model="form.confirmPass"
					@keyup.enter.native="submitForm"
				></el-input>
			</el-form-item>
			<el-form-item class="update-btn">
				<el-button
					type="primary"
					@click="submitForm"
					:loading="loading"
				>{{$t('profile.security.update')}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { listenCapsLock } from "@/utils/tools";
	import CapsLock from "@/components/CapsLock";
	export default {
		components: {
			CapsLock
		},
		data() {
			var pass = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error(this.$t("validations.pass_min")));
				} else if (value.length > 16) {
					callback(new Error(this.$t("validations.pass_max")));
				} else {
					if (rule.field === "newPass") {
						this.$refs.form.validateField("confirmPass");
					}
					callback();
				}
			};
			var confirmPass = (rule, value, callback) => {
				if (value === "") {
					callback(
						new Error(
							this.$t("validations.required", {
								tag: this.$t("profile.security.confirm_pass")
							})
						)
					);
				} else if (value !== this.form.newPass) {
					callback(new Error(this.$t("validations.confirm_pass_no")));
				} else {
					callback();
				}
			};
			return {
				rules: {
					oldPass: [
						{
							validator: pass,
							trigger: "blur",
							name: this.$t("profile.security.old_pass")
						}
					],
					newPass: [
						{
							validator: pass,
							trigger: "blur",
							name: this.$t("profile.security.new_pass")
						}
					],
					confirmPass: [{ validator: confirmPass, trigger: "blur" }]
				},
				form: {
					oldPass: "",
					newPass: "",
					confirmPass: ""
				},
				capsLock: false,
				loading: false
			};
		},
		methods: {
			listenKey({ key }) {
				const isCapsLock = (this.capsLock = listenCapsLock(key));
				if (key === "CapsLock" && this.capsLock) {
					this.capsLock = false;
				}
			},
			listenBlur() {
				this.capsLock = false;
			},
			submitForm() {
				this.$refs.form.validate(valid => {
					this.loading = true;
					if (valid) {
						this.$store
							.dispatch("user/updatePass", {
								old: this.form.oldPass,
								new: this.form.newPass
							})
							.then(res => {
								this.loading = false;
								this.$refs.form.resetFields();
								if (res.code === 20000) {
									var msg = {
										type: "success",
										title: "成功"
									};
								} else {
									var msg = {
										type: "error",
										title: "错误"
									};
                }

								this.$notify({
									...msg,
									message: res.message
								});
							})
							.catch(error => {
								console.log(error);
								this.loading = false;
								this.$notify.error({
									title: "错误",
									message: error
								});
							});
					} else {
						this.loading = false;
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	#Security {
		.el-form-item {
			margin-bottom: 8px;
		}
		.update-btn {
			margin-top: 30px;
		}
	}
</style>
