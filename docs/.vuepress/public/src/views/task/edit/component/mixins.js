export default {
  data() {
    return {
      isEditStatus: true
    }
  },
  created() {
    this.isEditStatus = !!this.$route.query.isEditStatus
  }
}
