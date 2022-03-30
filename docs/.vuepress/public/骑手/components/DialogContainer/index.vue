<template>
  <el-dialog
    ref="Dialog"
    :visible.sync="visible"
    :width="width"
    :title="title"
    :close-on-click-modal="closable"
    :close-on-press-escape="closable"
    :show-close="closable"
    :custom-class="customClassComputed"
    append-to-body
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <template slot="title">
      <!-- 标题插槽 -->
      <slot name="title" />
    </template>
    <div class="dialog-body">
      <!-- 内容插槽 -->
      <slot />
    </div>
    <template slot="footer">
      <!-- 底部插槽 -->
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogContainer',
  props: {
    // 弹框宽度
    width: {
      type: String,
      default: '50%'
    },
    // 弹框标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示关闭按钮|是否esc和点击遮罩关闭
    closable: {
      type: Boolean,
      default: true
    },
    // 自定义类名
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    customClassComputed() {
      return 'dialog-container ' + this.customClass
    }
  },
  methods: {
    showDialog() {
      this.visible = true
    },
    hideDialog() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.dialog-container {
  border-radius: 4px;
  .el-dialog__header {
    background: #f2f3f7;
    font-size: 13px;
    font-weight: 700;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .el-dialog__body {
    padding: 10px 20px 20px;
    font-size: 14px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e3e6ed;
    padding: 12px 20px 12px;
    text-align: right;
  }
}
</style>
