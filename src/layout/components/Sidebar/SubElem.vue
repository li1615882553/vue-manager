<template>
  <div>
    <template v-if="noChild">
      <router-link :to="resolvePath(item.path)">
        <el-menu-item :index="item.index">
          <elem-item :icon="!!item.icon ? item.icon : defaultIcon" :title="item.name" />
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="item.path" popper-append-to-body>
      <template slot="title">
        <elem-item 
          :icon="!!item.icon ? item.icon : defaultIcon"
          :title="item.name"
        >
        </elem-item>
      </template>
      <sub-elem v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)">
      </sub-elem>
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'
import ElemItem from "./ElemItem.vue";
export default {
  name: 'SubElem',
  components: { ElemItem },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null;
    return {
      defaultIcon: "start"
    }
  },
  computed: {
    noChild() {
      return !this.item.children || !this.item.children.length;
    }
  },
  methods: {
    resolvePath(routePath) {
      const curLevelPath = routePath.indexOf('/') === 0 ? routePath.slice(1) : routePath;
      if (this.noChild) {
        const sysCode = this.$store.getters.curSys
        if (routePath.includes(sysCode)) {
          return routePath;
        } else {
          return path.resolve(sysCode, curLevelPath);
        }
      }
      return path.resolve(this.basePath, curLevelPath)
    }
  }
}
</script>