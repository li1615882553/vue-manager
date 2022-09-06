<template>
  <h1>
    This is blog module's hello! 
    {{ $store.getters.curSys }}
    {{ curSys }}
  </h1>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Hello',
  created() {
    this.$store.commit('app/SET_CURSYS', 'blog')
  },
  computed:{
    ...mapGetters('app',[
      'curSys'
    ])
  }
}
</script>