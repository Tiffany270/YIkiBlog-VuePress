<template>
  <dialog-container
    class="dialog-off-the-shelf"
    :ref="DIALOG_REF"
    title="下架"
    width="450px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <block-container>
        <div class="page-container">是否下架已选中的内容？</div>
      </block-container>
    </page-container>

    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button type="primary" @click="handleOffTheShelf">确定</el-button>
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
  name: 'DialogOffTheShelf', // 下架
  props: [],
  components: {},
  inject: ['fatherMethod'],
  mixins: [Table, Dialog, BasePage],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    updateView(selectId, selectStatus) {
      this.ids = selectId
      this.status = selectStatus
      this.showDialog()
    },
    async findCommentUpdate() {
      const res = await getCommentEdit({
        status: 2, // 已下架2
        ids: this.ids
      })
      if (res.code === 0) {
        this.$message.success('下架成功')
      }
      this.fatherMethod()
    },
    handleOffTheShelf() {
      this.findCommentUpdate()
      this.hideDialog()
    }
  }
}
</script>
<style lang="scss"></style>
