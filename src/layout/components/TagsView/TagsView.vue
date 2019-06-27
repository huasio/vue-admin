<template>
	<div>
		<el-tab-pane
			:key="item.name"
			v-for="(item, index) in editableTabs"
			:label="item.title"
			:name="item.name"
		>{{item.content}}</el-tab-pane>
	</div>
</template>

<script>
	export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      name: }
    }
  };
</script>

<style>
</style>