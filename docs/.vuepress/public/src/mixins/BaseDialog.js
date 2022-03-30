// 控制组件显示/关闭，
import DialogContainer from '@/components/DialogContainer'

export default {
  components: { DialogContainer },
  data() {
    return {
      DIALOG_REF: 'DialogContainer' // 弹窗统一ref
    }
  },
  methods: {
    updateView() {
      // todo 需要实现（统一的弹窗页激活方法，相关业务逻辑写在这里
      this.showDialog()
    },
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
        // 不确定页面有几个表单，但假如只有一个但话，都叫'form'会好点
        this.$refs.form && this.$refs.form.resetFields() // 清理表单校验
      })
    }
  }
}
