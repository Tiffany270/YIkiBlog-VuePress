import DialogContainer from '@components/DialogContainer/index.vue'
export default {
  components: { DialogContainer },
  data() {
    return {
      DIALOG_REF: 'DialogContainer' // 弹窗统一ref
    }
  },
  methods: {
    /**
     * 暴露的展示弹窗方法
     */
    showDialog() {
      this.$refs[this.DIALOG_REF].showDialog()
    },
    /**
     * 暴露的关闭弹窗方法
     */
    hideDialog() {
      this.$refs[this.DIALOG_REF].hideDialog()
    },
    /**
     * 暴露的清理弹窗方法
     */
    resetDialog() {
      Object.assign(this.$data, this.$options.data())
      this.$nextTick(() => {
        // 如果组件中只有一个表单建议都叫form，这样关闭弹框后会清空表单的值
        this.$refs.form && this.$refs.form.resetFields() // 清理表单校验
      })
    }
  }
}
