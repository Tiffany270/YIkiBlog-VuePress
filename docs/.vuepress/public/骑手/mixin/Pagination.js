export default {
  data() {
    return {
      pages: {
        current: 1,
        size: 10
      }
    }
  },
  methods: {
    changePageNum(val) {
      this.pages.current = val
    },
    changePageSize(val) {
      this.pages.current = 1
      this.pages.size = val
    }
  }
}
