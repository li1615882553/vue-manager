<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import Vue from "vue";
	export default {
		name: "App",
		created() {
			this._provided.eventBus = new Vue();
		},
		provide: {
			eventBus: null,
		},
	};
</script>

<style>
	@import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";
</style>
