<template>
  <el-dialog
    ref="Dialog"
    :visible.sync="visibility"
    :width="width"
    :title="title"
    :close-on-click-modal="closable && easyClose"
    :close-on-press-escape="closable && easyClose"
    :show-close="closable"
    :custom-class="customClassComputed"
    append-to-body
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot v-if="$slots.alert" name="alert" />
    <el-alert v-else-if="alertMessage" :closable="false" class="custom-alert" show-icon type="warning"
      ><span class="alert-message">{{ alertMessage }}</span></el-alert
    >
    <div class="dialog-body">
      <slot />
    </div>
    <template slot="footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
/**
 * @author 王兆炜
 */
export default {
  name: 'DialogContainer',
  props: {
    title: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: true
    },
    easyClose: {
      // 防止误触关闭，true开启
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    customClass: {
      type: String,
      default: ''
    },
    alertMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visibility: false
    }
  },
  computed: {
    customClassComputed() {
      return 'dialog-container ' + (this.hideTitleBorder ? 'hide-title-border' : '') + ' ' + this.customClass
    },
    hideTitleBorder() {
      return !this.title
    }
  },
  mounted() {
    // if (this.title || this.$slots.title) {
    //   const el = this.$refs.Dialog.$el
    //   el.querySelector('.el-dialog__header').classList.add('divider')
    // }
  },
  methods: {
    showDialog() {
      this.visibility = true
    },
    hideDialog() {
      this.visibility = false
    }
  }
}
</script>

<style lang="scss">
.dialog-container.hide-title-border {
  .el-dialog__header {
    border-bottom: none !important;
  }
}

.dialog-container.el-dialog {
  .el-dialog__header {
    padding: 14px 20px;
    font-size: 16px;
  }
  .custom-alert {
    border: 0;
    border-radius: 0;
    .alert-message {
      font-size: 12px;
    }
  }

  .el-dialog__body {
    padding: 0;
    .dialog-body {
      position: relative;
      padding: 20px 24px;
    }
  }
}

.dialog-footer {
  .el-footer-text {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
