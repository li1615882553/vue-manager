<script>
import Icon from "@/components/Icon/Icon.vue";
export default {
  name: 'ElemItem',
  functional: true,
  components: {
    Icon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, iconType } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(<Icon className="sidebar-svg" iconClass={icon} height={20} width={20}></Icon>)
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>)
    }
    return vnodes
  }
}
</script>
<style scoped lang="scss">
  .sidebar-svg{
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
    