<template>
  <dialog-container
    class="dialog-comment-release"
    :ref="DIALOG_REF"
    title="发布"
    width="450px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <block-container>
        <div class="page-container">是否发布已选中的内容？</div>
      </block-container>
    </page-container>

    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button type="primary" @click="handleCommentRelease">确定</el-button>
      <el-button @click="hideDialog">取消</el-button>
    </template>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import { getCommentEdit } from '@/api/contentMange'
export default {
  name: 'DialogRelease', // 发布
  props: [],
  inject: ['fatherMethod'],
  components: {},
  mixins: [Table, Dialog, BasePage],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    updateView(selectId, newStatus) {
      this.ids = selectId
      this.status = newStatus
      // this.findCommentUpdate()
      this.showDialog()
    },
    // 评论管理-发布-状态更新
    async findCommentUpdate() {
      const res = await getCommentEdit({
        status: 1, // 已发布1
        ids: this.ids
      })
      if (res.code === 0) {
        this.$message.success('发布成功')
      }
      this.fatherMethod()
    },
    // 内容管理-发布-按钮
    handleCommentRelease() {
      this.findCommentUpdate()
      this.hideDialog()
    }
  }
}
</script>

<style scoped lang="scss"></style>
