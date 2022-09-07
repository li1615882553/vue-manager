<template>
	<fragment>
		<template v-if="noChild">
			<router-link :to="resolvePath(item, item.path)">
				<el-menu-item :index="resolvePath(item, item.path)">
					<elem-item
						:icon="!!item.icon ? item.icon : ( isactive ?  defaultActiveIcon : defaultIcon)"
						:title="item.name"
					/>
				</el-menu-item>
			</router-link>
		</template>
		<el-submenu
			v-else
			:index="resolvePath(item, item.path)"
			popper-append-to-body
		>
			<template slot="title">
				<elem-item
					:icon="!!item.icon ? item.icon : ( isactive ?  defaultActiveIcon : defaultIcon)"
					:title="item.name"
				>
				</elem-item>
			</template>
			<sub-elem
				v-for="child in item.children"
				:key="child.path"
				:item="child"
				:base-path="resolvePath(item, item.path)"
			>
			</sub-elem>
		</el-submenu>
	</fragment>
</template>
<script>
	import path from "path";
	import ElemItem from "./ElemItem.vue";
	export default {
		name: "SubElem",
		components: { ElemItem },
		props: {
			item: {
				type: Object,
				required: true,
			},
			basePath: {
				type: String,
				default: "",
			},
		},
		data() {
			this.isactive = false;
			return {
				defaultIcon: "start",
				defaultActiveIcon: "full-start"
			};
		},
		computed: {
			noChild() {
				return !this.item.children || !this.item.children.length;
			},
		},
		methods: {
			resolvePath(route, routePath) {
				const curLevelPath =
					routePath.indexOf("/") === 0 ? routePath.slice(1) : routePath;
				const resolvePath = path.resolve(this.basePath, curLevelPath);
				if(this.noChild){
					this.isactive = this.$route.path === resolvePath
				}else{
					this.isactive = this.$route.path.startsWith(resolvePath); 
				}
				return resolvePath;
			},
		},
	};
</script>