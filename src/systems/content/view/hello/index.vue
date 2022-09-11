<template>
  <h1>
    This is blog module's hello! 
    {{ curSys }}
  </h1>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Hello',
  created() {
  },
  computed:{
    ...mapGetters([
      'curSys'
    ])
  }
}
</script>