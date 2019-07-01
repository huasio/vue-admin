<template>
	<el-dropdown trigger="click" @command="clickLang">
		<span class="el-dropdown-link">
			{{title}}
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item
				v-for="(lang,index) in languages"
				:command="lang"
				:key="index"
				:disabled="currentLang === lang"
			>{{$t(`global.lang.languages.${lang}`)}}</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "语言"
			},
			languages: {
				type: [Array, Object],
				default: []
			},
			currentLang: {
				type: String,
				default: "zh-CN"
			}
		},
		methods: {
			clickLang(lang) {
				this.$emit("clickLang", lang);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.el-dropdown-link {
		cursor: pointer;
	}
	.el-popper {
		padding: 6px 0 !important;
		margin-top: 0 !important;
		li {
			word-break: keep-all;
		}
	}
</style>
