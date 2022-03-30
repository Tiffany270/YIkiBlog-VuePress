<template>
  <dialog-container
    class="dialog-content-detail-audit"
    :ref="DIALOG_REF"
    title="审核"
    width="500px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <div class="">
        <block-container>
          <div class="single-audit-title page-content">
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
      <el-button type="primary" @click="confirmDetailAudit">确认</el-button>
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
  name: 'DialogContentDetailAudit', // 详情审核
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
    updateView(id, status) {
      this.ids = [id]
      this.status = status
      this.showDialog()
    },
    // 内容管理-审核-状态更新
    async findContentUpdate() {
      if (this.status === 4) {
        const res = await getContentUpdate({
          //当审核通过后，状态改为“已发布1”，当审核驳回后，状态改为“已驳回4”
          // status: this.status,
          status: 4,
          ids: this.ids
        })
        if (res.code === 0) {
          this.$message.success('操作成功')
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
          this.$message.success('操作成功')
        }
        this.fatherMethod()
      }
    },
    //  内容详情-审核-确认按钮
    confirmDetailAudit() {
      this.findContentUpdate()
      this.hideDialog()
    }
  }
}
</script>
<style lang="scss"></style>
