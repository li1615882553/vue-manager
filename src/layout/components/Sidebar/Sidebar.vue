<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
      active-text-color="#20a0ff" text-color="#bfcbd9">
      <sub-elem
        v-for="route in menus"
        :key="route.name"
        :item="route"
        :base-path="sysPath"
      >
      </sub-elem>
    </el-menu>
  </div>
</template>

<script>
import SubElem from './SubElem.vue';
export default {
  components: { SubElem },
  props:{
    sysPath: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      collapse: this.$store.getters.sidebarCollapse
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
    resolvePath(menu, routePath) { },
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

.sidebar>ul {
  height: 100%;
}
</style>
