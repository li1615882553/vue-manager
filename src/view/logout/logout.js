export default {
  name: 'Logout',
  render(h) {
    return h()
  },
  beforeCreate() {
    this.$store.dispatch('user/logout')
  }
}
