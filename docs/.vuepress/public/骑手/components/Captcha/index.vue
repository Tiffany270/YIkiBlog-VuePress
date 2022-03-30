<template>
  <el-dialog
    :visible.sync="visibility"
    :show-close="false"
    width="300px"
    custom-class="dialog-captcha"
    append-to-body
    :close-on-click-modal="true"
    title="拖动下方滑块完成拼图"
  >
    <div id="captcha" />
  </el-dialog>
</template>

<script>
let captchaIns = null

export default {
  name: 'Captcha',
  data() {
    return {
      visibility: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      captchaIns && captchaIns.refresh()
    },
    updateView() {
      const _this = this
      window.initNECaptcha(
        {
          // config对象，参数配置
          captchaId: '7344e3c216e249a0a2252dd16f487c8b',
          element: '#captcha',
          mode: 'embed',
          width: '300px',
          // eslint-disable-next-line handle-callback-err
          onVerify: (err, data) => {
            // 验证回调
            if (data && data.validate) {
              _this.$emit('on-success', data.validate)
              this.visibility = false
            }
          }
        },
        function onload(instance) {
          captchaIns = instance
          // 初始化成功后得到验证实例instance，可以调用实例的方法
        }
      )
      this.visibility = true
    }
  }
}
</script>

<style lang="scss">
.dialog-captcha {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
