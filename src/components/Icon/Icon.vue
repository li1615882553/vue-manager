<template>
  <svg  :class="svgClass" 
        :style="{
            'width':`${width}px`,
            'height':`${height}px`
        }" 
        aria-hidden="true" >
    <use :xlink:href="iconName" ref="svgRefs"></use>
  </svg>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    width:{
        type:Number
    },
    height:{
        type:Number
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  },
  mounted(){      
  } 
}
</script>

<style scoped>
.svg-icon {  
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>