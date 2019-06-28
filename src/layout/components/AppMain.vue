<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :include="cachedView">
				<router-view :key="key"></router-view>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
	export default {
		name: "AppMain",
		computed: {
			key() {
				return this.$route.fullPath;
			},
			cachedView() {
				return this.$store.state.tagsView.cachedViews;
			}
		}
	};
</script>

<style>
	.app-main {
		/* 50= navbar  50  */
		min-height: calc(100vh - 60px);
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	/* fade-transform */
	.fade-transform-leave-active,
	.fade-transform-enter-active {
		transition: all 0.5s;
	}

	.fade-transform-enter {
		opacity: 0;
		transform: translateX(-30px);
	}

	.fade-transform-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
</style>
