<template>
	<span :class="objClass" @click="toggleClick"></span>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  },
  computed: {
    objClass () {
      return {
        hamburger: true,
        'el-icon-s-fold': !this.status,
        'el-icon-s-unfold': this.status
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.hamburger {
		font-size: 30px;
		padding-left: 6px;
		line-height: 60px !important;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}
</style>
