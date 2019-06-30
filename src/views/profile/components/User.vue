<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>{{$t('profile.subtitle')}}</span>
		</div>
		<el-row type="flex" justify="center">
			<div class="profile-image">
				<el-image :src="user.avatar"></el-image>
				<p class="profile-name" :title="$t('profile.user_name')">{{user.name}}</p>
				<el-breadcrumb separator="/" class="profile-role" :title="$t('profile.role')">
					<el-breadcrumb-item v-for="(role,index) in user.roles" :key="index">{{role}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</el-row>
		<el-row>
			<div class="introduction profile-other">
				<span>
					<i class="el-icon-postcard"></i>
					{{$t('profile.intro')}}
				</span>
				<el-divider></el-divider>
				<div class="content">
					<p>{{user.introduction}}</p>
				</div>
			</div>
		</el-row>
	</el-card>
</template>

<script>
	export default {
		props: {
			user: {
				type: Object,
				default: () => {
					return {
						avatar: "",
						name: "",
						role: "",
						introduction: ""
					};
				}
			}
		}
	};
</script>

<style>
	.profile-role .el-breadcrumb__separator {
		margin: 0 6px;
	}
</style>

<style lang="scss" scoped>
	.profile-image {
		text-align: center;
		.el-image {
			width: 100px;
			height: 100px;
			border-radius: 50px;
		}
		.profile-name {
			font: {
				size: 18px;
				weight: 700;
			}
			padding: 6px 0;
		}
		.profile-role {
			font-size: 14px;
			color: #777;
		}
	}

	.profile-other {
		margin-top: 30px;
	}

	.introduction {
		span {
			color: #606266;
			font-weight: 700;
			i {
				font: {
					weight: inherit;
					size: 1.2em;
				}
				margin-right: 2px;
			}
		}
		.el-divider--horizontal {
			margin: 8px 0;
		}
		.content {
			font-size: 12px;
		}
	}
</style>
