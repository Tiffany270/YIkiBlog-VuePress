<template>
  <dialog-container
    class="dialog-batch-audit"
    :ref="DIALOG_REF"
    title="批量审核"
    width="500px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <div class="batch-audit">
        <block-container>
          <div class="dialog-batch-audit-title page-content">
            <template>
              审核结果：
              <el-radio-group v-model="status">
                <el-radio :label="0">通过</el-radio>
                <el-radio :label="4">驳回</el-radio>
              </el-radio-group>
            </template>
          </div>
        </block-container>
      </div>
    </page-container>
    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button type="primary" @click="confirmAudit">确认</el-button>
      <el-button @click="hideDialog">取消</el-button>
    </template>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import { getContentUpdate } from '@/api/contentMange'

export default {
  name: 'DialogBatchAudit', // 内容批量审核
  props: [],
  inject: ['fatherMethod'],
  components: {},
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      status: 0
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.findContentUpdate()
  },
  methods: {
    updateView(selectId, selectStatus) {
      this.ids = selectId
      this.status = selectStatus
      this.showDialog()
    },
    // 内容管理-批量审核-状态更新
    async findContentUpdate() {
      if (this.status === 4) {
        const res = await getContentUpdate({
          //当审核通过后，状态改为“已发布1”，当审核驳回后，状态改为“已驳回4”
          // status: this.status,
          status: 4,
          ids: this.ids
        })
        if (res.code === 0) {
          this.$message.success('审核成功')
        }
        this.fatherMethod()
      } else if (this.status === 0) {
        const res = await getContentUpdate({
          //当审核通过后，状态改为“已发布1”，当审核驳回后，状态改为“已驳回4”
          // status: this.status,
          status: 1,
          ids: this.ids
        })
        if (res.code === 0) {
          this.$message.success('审核成功')
        }
        this.fatherMethod()
      }
    },
    //  内容管理-批量审核-确认按钮
    confirmAudit() {
      this.findContentUpdate()
      this.hideDialog()
    }
  }
}
</script>
<style lang="scss"></style>
