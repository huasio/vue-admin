<template>
	<div id="CapsLock">
		<el-form-item :label="label">
			<el-tooltip
				v-bind="bind"
				v-model="capsLock"
				:content="$t('login.message.caps_lock')"
				@keyup.native="listenKey"
				@blur.prevent="listenBlur"
			>
				<el-input type="text" v-bind="inputAttribute" v-model="value"></el-input>
			</el-tooltip>
		</el-form-item>
	</div>
</template>

<script>
	import { listenCapsLock } from "@/utils/tools";
	export default {
		props: {
			bind: {
				type: Object,
				default: () => {
					return {};
				}
			},
			label: "",
			inputAttribute: {
				type: Object,
				default: () => {
					return {};
				}
			}
		},
		data() {
			return {
				value: "",
				capsLock: false
			};
		},
		methods: {
			listenKey({ key }) {
				this.capsLock = listenCapsLock(key);
				if (key === "CapsLock" && this.capsLock) {
					this.capsLock = false;
				}
			},
			listenBlur() {
				this.capsLock = false;
			}
		}
	};
</script>

<style>
</style>
