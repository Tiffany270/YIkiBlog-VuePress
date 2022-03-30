<template>
  <dialog-container
    class="dialog-release"
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
      <el-button type="primary" @click="handleUndercarriage">确定</el-button>
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
  name: 'DialogUndercarriage', // 下架
  props: [],
  components: {},
  inject: ['fatherMethod'],
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
    async findContentUpdate() {
      const res = await getContentUpdate({
        status: 2, // 当用户勾选的内容状态都为【已发布 1】时，下架【2】按钮高亮
        ids: this.ids
      })
      if (res.code === 0) {
        this.$message.success('下架成功')
      }
      this.fatherMethod()
    },
    handleUndercarriage() {
      this.findContentUpdate()
      this.hideDialog()
    }
  }
}
</script>
<style lang="scss"></style>
