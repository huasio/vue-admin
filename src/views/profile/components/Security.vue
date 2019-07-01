<template>
	<div id="Security">
		<el-row>
			<PasswordForm />
		</el-row>
	</div>
</template>

<script>
	import PasswordForm from "./SecurityFrom";
	export default {
		components: {
			PasswordForm
		},
		data() {
			return {};
		},
		methods: {}
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
