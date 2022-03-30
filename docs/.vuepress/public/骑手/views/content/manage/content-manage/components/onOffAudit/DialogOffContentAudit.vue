<template>
  <dialog-container
    class="dialog-off-content-audit"
    :ref="DIALOG_REF"
    title="关闭内容审核"
    width="450px"
    @closed="resetDialog"
    center
  >
    <page-container>
      <block-container>
        <div class="page-container">
          是否关闭内容审核机制？ 用户发布的所有内容都直接发布。
        </div>
      </block-container>
    </page-container>
    <template v-slot:footer class="el-dialog__footer center-button">
      <el-button
        type="danger"
        plain
        style="width: 104px; margin-left: 14px"
        :disabled="isBtnDisabled"
        @click="offAudit"
      >
        {{ cutdownNum !== 0 ? cutdownNum + 's' : '确定' }}
      </el-button>
      <el-button @click="hideDialog">取消</el-button>
    </template>
  </dialog-container>
</template>

<script>
import Table from '@/mixin/Table'
import Dialog from '@/mixin/Dialog'
import BasePage from '@/mixin/BasePage'
import { getContentSetting } from '@/api/contentMange'
export default {
  name: 'DialogOffContentAudit', // 关闭内容审核
  props: [],
  components: {},
  inject: ['fatherMethod'],
  mixins: [Table, Dialog, BasePage],
  data() {
    return {
      cutdownNum: 0
    }
  },
  computed: {
    isBtnDisabled() {
      let flag = false
      if (this.cutdownNum) {
        flag = true
      }
      return flag
    }
  },
  watch: {},
  mounted() {
    // this.findAuditStatus()
  },
  methods: {
    updateView(audit) {
      this.audit = audit
      this.showDialog()
      this.countDown()
    },
    // 内容管理-获取内容审核状态是否开启，data返回false表示关闭
    async upDateContentSetting() {
      const res = await getContentSetting({
        audit: this.audit
      })
      if (res.code === 0) {
        this.$message.success('设置成功')
      }
      this.fatherMethod()
    },
    // 确定关闭审核状态
    offAudit() {
      this.upDateContentSetting()
      this.hideDialog()
    },
    // 倒计时
    countDown() {
      this.cutdownNum = 5
      this.timer = setInterval(() => {
        this.cutdownNum--
        if (this.cutdownNum <= 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss"></style>
