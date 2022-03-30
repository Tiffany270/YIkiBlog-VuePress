<template>
  <dialog-container
    class="dialog-release"
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
      <el-button type="primary" @click="handleRelease">确定</el-button>
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
  name: 'DialogRelease', // 发布
  props: [],
  inject: ['fatherMethod'],
  components: {},
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      status: ''
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
    // 内容管理-发布-状态更新
    async findContentUpdate() {
      const res = await getContentUpdate({
        status: 1, //当用户勾选的内容状态都为【已下架 2】时，【发布 1】按钮高亮
        ids: this.ids
      })
      if (res.code === 0) {
        this.$message.success('发布成功')
      }
      this.fatherMethod()
    },
    // 内容管理-发布-按钮
    handleRelease() {
      this.findContentUpdate()
      this.hideDialog()
    }
  }
}
</script>

<style scoped lang="scss"></style>
