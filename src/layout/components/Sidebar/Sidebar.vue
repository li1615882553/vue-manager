<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="collapse"
			background-color="#324157"
			active-text-color="#20a0ff"
			text-color="#bfcbd9"
		>
			<template v-for="item in menus">
				<template v-if="item.children">
					<el-submenu :index="item.path" :key="item.path">
						<template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.name }}</span>
						</template>
						<template v-for="subItem in item.children">
							<el-submenu
								v-if="subItem.children"
								:index="subItem.path"
								:key="subItem.path"
							>
								<template slot="title">{{ subItem.name }}</template>
								<app-link :to="resolvePath()">
									<el-menu-item
										v-for="(threeItem, i) in subItem.children"
										:key="i"
										:index="threeItem.path"
										>{{ threeItem.name }}
									</el-menu-item>
								</app-link>
							</el-submenu>
							<el-menu-item v-else :index="subItem.path" :key="subItem.path">{{
								subItem.name
							}}</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.path" :key="item.path">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.name }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import AppLink from "./Link.vue";
	export default {
		data() {
			return {
				collapse: false,
			};
		},
		inject: ["eventBus"],

		computed: {
			menus() {
				const curSys = this.$store.getters.curSys;
				var menuTemp = [];
				if (
					this.$store.getters.sysMenus[curSys] &&
					this.$store.getters.sysMenus[curSys][0] &&
					this.$store.getters.sysMenus[curSys][0]["children"]
				) {
					menuTemp = this.$store.getters.sysMenus[curSys][0]["children"];
				}
				console.log(curSys, this.$store.getters.sysMenus)
				return menuTemp;
			},
			onRoutes() {
				return this.$route.path.replace("/", "");
			},
		},
		created() {
			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
			this.eventBus.$on("collapse", (msg) => {
				this.collapse = msg;
				this.eventBus.$emit("collapse-content", msg);
			});
		},
		methods: {
			resolvePath(menu, routePath) {},
		},
	};
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}
	.sidebar::-webkit-scrollbar {
		width: 0;
	}
	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}
	.sidebar > ul {
		height: 100%;
	}
</style>
