<template>
	<div>
		<router-view :key="key"></router-view>
	</div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style>
</style>
