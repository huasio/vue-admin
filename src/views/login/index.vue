<template>
	<el-container>
		<el-col>
			<el-row type="flex" justify="center" align="middle" class="form-main">
				<transition name="el-zoom-in-center">
					<el-card v-show="isShow" class="box-card">
						<div slot="header" class="clearfix">
							<span>登录</span>
						</div>
						<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
							<el-form-item label="用户名" prop="user">
								<el-input
									type="text"
									tabindex="1"
									v-model="ruleForm.user"
									autocomplete="on"
									placeholder="输入用户名/邮箱/手机号"
									prefix-icon="el-icon-user-solid"
								></el-input>
							</el-form-item>
							<el-tooltip
								v-model="capsLock"
								class="item"
								content="大写锁定"
								effect="dark"
								placement="right-end"
								manual
							>
								<el-form-item label="密码" prop="pass">
									<el-input
										type="password"
										tabindex="2"
										v-model="ruleForm.pass"
										placeholder="输入长度为 6-16 位的密码"
										autocomplete="on"
										:show-password="true"
										@keyup.native="listenKey"
										@blur.prevent="listenBlur"
										prefix-icon="el-icon-lock"
									></el-input>
								</el-form-item>
							</el-tooltip>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
								<el-button @click="resetForm('ruleForm')">重置</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</transition>
			</el-row>
		</el-col>
	</el-container>
</template>

<script>
	/**
	 * 1. 密码可见
	 * 2. 点击 button 之后，button 进入 loading
	 * 3. 大写锁定提示
	 * 4. 输入框自动获取焦点
	 */
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入长度为 6-16 位的密码"));
				} else if (value.length < 6) {
					callback(new Error("密码长度小于 6 位"));
				} else if (value.length > 16) {
					callback(new Error("密码长度大于 16 位"));
				} else {
					callback();
				}
			};
			var validationUser = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入用户名/邮箱/手机号"));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					pass: "",
					user: ""
				},
				rules: {
					pass: [{ validator: validatePass, trigger: "blur" }],
					user: [{ validator: validationUser, trigger: "blur" }]
				},
				isShow: false,
				capsLock: false,
				loading: false,
				otherQuery: {}
			};
		},
		mounted() {
			this.otherQuery = this.getOtherQuery();
			this.isShow = true;
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$notify.error({
							title: "错误",
							message: "登录失败"
            });

						this.$router.replace({
							path: this.$route.query.redirect || "/",
							query: this.otherQuery
						});
					} else {
						this.$notify.error({
							title: "错误",
							message: "请完善表单信息"
						});
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			/**
			 * 几种情况:
			 * 1. 未处于大写状态，按 shift， key 是大写字符
			 * 2. 处于大写状态，按 shift，key 是小写
			 * 3. 不按 shift，照常切换大小写
			 * 4. 基于上述情况，使用 key 来判断最为合适
			 *
			 * 5. 避免出现意外情况，最后会判断是否处于大写，并且提示状态为 true，那么恢复
			 * 6. 若是出现提示，那么当输入框焦点不在保持，则隐藏
			 *
			 */
			listenKey({ key }) {
				if (key && key.length === 1) {
					if (key >= "A" && key <= "Z") {
						this.capsLock = true;
					} else {
						this.capsLock = false;
					}
				}
				if (key === "CapsLock" && this.capsLock) {
					this.capsLock = false;
				}
			},
			listenBlur() {
				this.capsLock = false;
			},
			getOtherQuery() {
				const { query } = this.$route;
				return Object.keys(query).reduce((init, item) => {
					if (item !== "redirect") {
						init[item] = query[item];
					}
					return init;
				}, {});
			}
		}
	};
</script>
<style>
	body {
		background: url(https://konachan.net/sample/34e64202c2d6f1ded668eacb2ad5f9cd/Konachan.com%20-%20284897%20sample.jpg)
			no-repeat center center/cover;
	}
	.form-main {
		height: 100vh;
	}
	.el-card {
		width: 500px;
		height: 300px;
		opacity: 0.9;
	}
	.el-card__body {
		width: 400px !important;
	}
</style>
