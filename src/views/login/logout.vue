<script>
	export default {
		created() {
			this.$store.dispatch("user/resetToken");
		},
		render(h) {
			return h;
		}
	};
</script>
