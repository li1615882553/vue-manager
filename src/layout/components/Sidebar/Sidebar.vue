<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:collapse="collapse"
			:default-active="$route.path"
			background-color="#324157"
			active-text-color="#20a0ff"
			text-color="#bfcbd9"
		>
			<sub-elem
				v-for="route in menus"
				:key="route.name"
				:item="route"
				:base-path="curSys"
			>
			</sub-elem>
		</el-menu>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import SubElem from "./SubElem.vue";
	export default {
		components: { SubElem },
		data() {
			return {};
		},
		inject: ["eventBus"],

		computed: {
			...mapGetters(['curSys']),
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
				return menuTemp;
			},
			collapse() {
				return this.$store.getters.sidebarCollapse;
			},
		},
		created() {},
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
