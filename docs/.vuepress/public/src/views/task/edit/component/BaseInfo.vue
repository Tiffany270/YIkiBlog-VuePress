<template>
  <div class="form-block-container">
    <div class="form-block-header">基本信息</div>
    <div class="form-block-content">
      <template v-if="isEditStatus">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" inline size="medium">
          <el-form-item label="任务名称：" prop="taskName">
            <div style="display: flex">
              <el-input v-model.trim="form.taskName" placeholder="请输入任务名称" clearable maxlength="50" />
            </div>
          </el-form-item>
          <el-form-item label="任务名额：" prop="quota">
            <el-input v-model.trim="form.quota" placeholder="请输入任务名额" />
          </el-form-item>
          <el-form-item label="任务有效期：" prop="expireDate">
            <el-date-picker
              v-model="form.expireDate"
              type="date"
              placeholder="请选择任务有效期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="block" label="任务描述：" prop="description">
            <el-input
              type="textarea"
              v-model.trim="form.description"
              placeholder="请输入任务描述"
              maxlength="200"
              resize="none"
              rows="4"
            />
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form ref="form" :model="form" label-width="140px" inline size="medium">
          <el-form-item label="任务名称：" class="block">
            {{ form.taskName }}
          </el-form-item>
          <el-form-item label="任务名额：">
            {{ form.quota }}
          </el-form-item>
          <el-form-item label="任务有效期：">
            {{ form.expireDate }}
          </el-form-item>
          <el-form-item class="block" label="任务描述：">
            {{ form.description }}
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
// import { findCustomerName } from '@/apis/complianceRiskControl'
import { staticRules } from '@/utils/validate'
import mixins from './mixins'

export default {
  name: 'MBaseInfo',
  mixins: [mixins],
  data() {
    return {
      loadingBtn: false,
      form: {
        taskName: '',
        quota: '',
        expireDate: '',
        description: ''
      },
      rules: {
        taskName: [staticRules('任务名称').required],
        quota: [staticRules('任务名额').required, staticRules('任务名额').limitNum(1, 99999999, true)],
        expireDate: [staticRules('任务有效期').required],
        description: [staticRules('任务描述').required]
      }
    }
  },
  methods: {
    handleSkyQuery() {
      // this.loadingBtn = true
      // findCustomerName({ customerName: this.form.tenantName })
      //   .then(({ data }) => {
      //     this.form = Object.assign(this.form, data)
      //     this.$emit('handle-esy-sky-query-data', data)
      //     this.loadingBtn = false
      //   })
      //   .catch(() => {
      //     this.loadingBtn = false
      //   })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item__content {
  word-break: break-all;
}
</style>
