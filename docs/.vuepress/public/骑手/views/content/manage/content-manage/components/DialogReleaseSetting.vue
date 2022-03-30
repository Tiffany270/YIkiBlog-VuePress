<template>
  <dialog-container
    class="dialog-release-setting"
    :ref="DIALOG_REF"
    title="发布设置"
    width="500px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <div class="">
        <block-container>
          <div class="release-setting-content page-content">
            <template>
              内容审核：
              <el-radio-group v-model="audit">
                <el-radio :label="true">开启</el-radio>
                <el-radio :label="false">关闭</el-radio>
              </el-radio-group>
            </template>
          </div>
        </block-container>
      </div>
    </page-container>
    <dialog-on-content-audit
      ref="DialogOnContentAudit"
    ></dialog-on-content-audit>
    <dialog-off-content-audit
      ref="DialogOffContentAudit"
    ></dialog-off-content-audit>
    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button type="primary" @click="handleReleaseSetting">确认</el-button>
      <el-button @click="hideDialog">取消</el-button>
    </template>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import DialogOnContentAudit from './onOffAudit/DialogOnContentAudit.vue'
import DialogOffContentAudit from './onOffAudit/DialogOffContentAudit.vue'
export default {
  name: 'DialogReleaseSetting', // 发布设置
  components: { DialogOnContentAudit, DialogOffContentAudit },
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      audit: true
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.findContentSetting()
  },
  methods: {
    updateView(selectId, selectStatus, isOpenAudit) {
      this.id = selectId
      this.status = selectStatus
      this.audit = isOpenAudit
      this.showDialog()
    },
    // 发布设置-按钮
    handleReleaseSetting() {
      if (this.audit === true) {
        // 开启-开启内容审核-二次弹窗
        this.$refs.DialogOnContentAudit.updateView(this.audit)
        this.hideDialog()
      } else if (this.audit === false) {
        // 关闭-关闭内容审核-二次弹窗
        this.$refs.DialogOffContentAudit.updateView(this.audit)
        this.hideDialog()
      }
    }
  }
}
</script>
<style lang="scss"></style>
