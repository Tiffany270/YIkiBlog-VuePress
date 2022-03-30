<template>
  <dialog-container
    :ref="DIALOG_REF"
    title="审核"
    width="600px"
    class="dialog-show-approval"
  >
    <el-select v-model="status" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div class="btn-group">
      <el-button @click="hideDialog()">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </dialog-container>
</template>
<script>
import Dialog from '@/mixin/Dialog'
import { approvalContribution } from '@/api/contribution'
import { statusOptions } from '../index/config'
export default {
  name: 'DialogShowPic',
  mixins: [Dialog],
  data() {
    return {
      contributionId: '',
      status: 'PASS'
    }
  },
  computed: {
    options() {
      return statusOptions.slice(0)
    }
  },
  methods: {
    updateView(id) {
      this.contributionId = id
      this.showDialog()
    },
    confirm() {
      const data = {
        contributionId: this.contributionId,
        status: this.status
      }
      approvalContribution(data).then(res => {
        if (res && res.data) {
          this.$message.success('审核成功')
          this.$emit('approval-success')
          this.hideDialog()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-show-approval {
  /deep/.dialog-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-select {
      margin-bottom: 20px;
    }
    .btn-group {
      text-align: center;
    }
  }
}
</style>
