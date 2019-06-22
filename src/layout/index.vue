<template>
	<div>
		<el-container>
			<el-aside width="">
				<SideBar/>
			</el-aside>
			<el-container>
				<el-header>
					<NavBar/>
				</el-header>
				<el-main>
					<AppMain/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import { AppMain, NavBar, SideBar } from './components'
export default {
  components: {
    AppMain,
    NavBar,
    SideBar
  }
}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.el-header {
		color: #333;
		line-height: 60px;
		padding: 0 !important;
	}

	.el-aside {
		background-color: #545c64;
		color: #333;
	}

	.el-main {
		background-color: #e9eef3;
		color: #333;
		padding: 0x;
		height: calc(100vh - 60px);
	}
	.el-scrollbar__thumb {
		background-color: #fff !important;
	}

	.el-scrollbar__wrap {
		overflow-x: hidden !important;
	}
</style>
