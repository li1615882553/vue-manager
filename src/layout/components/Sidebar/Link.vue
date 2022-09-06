
<template>
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Link",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
