<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar :sysPath="this.$store.getters.currSys"></v-sidebar>
		<div class="content-box" :class="{ 'content-collapse': collapse }">
			<v-tags></v-tags>
			<div class="content">
				<transition name="move" mode="out-in">
					<keep-alive :include="tagsList">
						<router-view></router-view>
					</keep-alive>
				</transition>
				<el-backtop target=".content"></el-backtop>
			</div>
		</div>
	</div>
</template>
<script>
	import vHead from "./components/Header/Header.vue";
	import vSidebar from "./components/Sidebar/Sidebar.vue";
	import vTags from "./components/Tags/Tags.vue";
	export default {
		name: "Layout",
		inject: ["eventBus"],
		components: {
			vHead,
			vSidebar,
			vTags,
		},
		data() {
			return {
				tagsList: [],
				collapse: false,
			};
		},
		created() {
			this.eventBus.$on("collapse-content", (msg) => {
				this.collapse = msg;
			});

			// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
			this.eventBus.$on("tags", (msg) => {
				let arr = [];
				for (let i = 0, len = msg.length; i < len; i++) {
					msg[i].name && arr.push(msg[i].name);
				}
				this.tagsList = arr;
			});
		},
	};
</script>

<style lang="scss" scoped>
	.content-box {
		display: flex;
		flex-direction: column;
	}
</style>