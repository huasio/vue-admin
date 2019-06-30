<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		name: "App"
	};
</script>

<style lang="scss">
	body {
		min-width: 756px;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
			"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		font-size: 14px;
	}
</style>
