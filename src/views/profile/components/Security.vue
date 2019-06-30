<template>
	<div id="Security">
		<el-form>
			<el-form-item :label="$t('security.old_pass')">
				<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="top">
					<el-input type="text" placeholder v-model="old_pass" maxlength="16" show-word-limit></el-input>
				</el-tooltip>
			</el-form-item>
			<el-form-item :label="$t('security.new_pass')">
				<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="top">
					<el-input type="text" placeholder v-model="new_pass" maxlength="16" show-word-limit></el-input>
				</el-tooltip>
			</el-form-item>
			<el-form-item :label="$t('security.repeat_pass')">
				<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="top">
					<el-input type="text" placeholder v-model="confirm_pass" maxlength="16" show-word-limit></el-input>
				</el-tooltip>
			</el-form-item>

			<el-form-item class="update-btn">
				<el-button type="primary">{{$t('security.update')}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				old_pass: "",
				new_pass: "",
				confirm_pass: ""
			};
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
