<template>
	<el-container>
		<el-col>
			<el-row type="flex" justify="center" align="middle" class="form-main">
				<transition name="el-zoom-in-center">
					<el-card v-show="isShow" class="box-card">
						<div slot="header" class="clearfix">
							<el-row>
								<el-col :span="12">
									<el-row type="flex" justify="start">
										<span>{{$t('login.title')}}</span>
									</el-row>
								</el-col>
								<el-col :span="12">
									<el-row type="flex" justify="end">
										<Lang
											:current-lang="currentLang"
											:languages="languages"
											@clickLang="clickLang"
											:title="$t('general.lang.title')"
										/>
									</el-row>
								</el-col>
							</el-row>
						</div>
						<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
							<el-form-item :label="$t('login.user')" prop="user">
								<el-input
									type="text"
									ref="user"
									tabindex="1"
									v-model="ruleForm.user"
									autocomplete="on"
									:placeholder="$t('login.message.user_required')"
									prefix-icon="el-icon-user-solid"
								></el-input>
							</el-form-item>
							<el-tooltip
								v-model="capsLock"
								class="item"
								:content="$t('login.message.caps_lock')"
								effect="dark"
								placement="right-end"
								manual
							>
								<el-form-item :label="$t('login.pass')" prop="pass">
									<el-input
										type="password"
										tabindex="2"
										ref="pass"
										v-model="ruleForm.pass"
										:placeholder="$t('login.message.pass_requried')"
										autocomplete="on"
										:show-password="true"
										@keyup.native="listenKey"
										@blur.prevent="listenBlur"
										@keyup.enter.native="submitForm"
										prefix-icon="el-icon-lock"
									></el-input>
								</el-form-item>
							</el-tooltip>
							<el-form-item>
								<el-row>
									<el-button
										type="primary"
										@click="submitForm"
										style="width:100%;margin-bottom: 6px;"
										:loading="loading"
									>{{$t('login.title')}}</el-button>
								</el-row>
								<el-row>
									<el-button @click="resetForm" style="width: 100%;">{{$t('general.reset')}}</el-button>
								</el-row>
							</el-form-item>
						</el-form>
					</el-card>
				</transition>
			</el-row>
		</el-col>
	</el-container>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import Lang from "@/components/Language";
	import { listenCapsLock } from "@/utils/tools";
	/**
	 * 1. 密码可见
	 * 2. 点击 button 之后，button 进入 loading
	 * 3. 大写锁定提示
	 * 4. 输入框自动获取焦点
	 */
	export default {
		components: {
			Lang
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error(this.$t("login.message.pass_requried")));
				} else if (value.length < 6) {
					callback(new Error(this.$t("login.message.pass_min")));
				} else if (value.length > 16) {
					callback(new Error(this.$t("login.message.pass_max")));
				} else {
					callback();
				}
			};
			var validationUser = (rule, value, callback) => {
				if (value === "") {
					callback(new Error(this.$t("login.message.user_required")));
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
		computed: {
			...mapState("lang", ["languages", "currentLang"])
		},
		mounted() {
			this.otherQuery = this.getOtherQuery();
			this.isShow = true;
			if (this.ruleForm.user === "") {
				this.$refs.user.focus();
			} else if (this.ruleForm.pass === "") {
				this.$refs.pass.focus();
			}
		},
		methods: {
			...mapActions("lang", ["setLang"]),
			submitForm() {
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
						this.loading = true;
						this.$store
							.dispatch("user/login", this.ruleForm)
							.then((resolve, reject) => {
								this.loading = false;
								this.$router.replace({
									path: this.$route.query.redirect || "/",
									query: this.otherQuery
								});
							})
							.catch(error => {
								this.loading = false;
								console.log(error);
							});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs.ruleForm.resetFields();
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
				const isCapsLock = (this.capsLock = listenCapsLock(key));
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
			},
			clickLang(lang) {
				this.setLang(lang);
			}
		}
	};
</script>
<style scoped>
	.form-main {
		background: url("~@/assets/img/login-background.jpg") no-repeat center
			center/cover;
	}
	.form-main {
		height: 100vh;
	}
	.el-card {
		width: 500px;
		height: 300px;
		opacity: 0.9;
	}
	.el-form {
		width: 400px !important;
	}
</style>
