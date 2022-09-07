<template>
	<div class="content">
		<transition name="fade-transform" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	import storeModule from "../store";
	import moduleConfig from "../config";

	export default {
		name: "Layout",
		async mounted() {
			this.$store.registerModule(moduleConfig.name, storeModule);
		},
		beforeDestroy() {
			this.$store.unregisterModule(moduleConfig.name);
		},
	};
</script>