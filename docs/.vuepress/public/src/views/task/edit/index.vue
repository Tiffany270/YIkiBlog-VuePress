<template>
  <page-container show-go-back v-loading="isLoading">
    <base-info ref="BaseInfo"></base-info>
    <settlement-info ref="SettlementInfo"></settlement-info>
    <service-agreement ref="ServiceAgreement"></service-agreement>
    <template v-slot:bottomBarRight>
      <div v-if="isEditStatus">
        <el-button type="primary" @click="next" :disabled="!canNext">{{ submitText }}</el-button>
      </div>
    </template>
  </page-container>
</template>
<script>
import BasePage from '@/mixins/BasePage'
import mixins from './component/mixins'
import BaseInfo from './component/BaseInfo'
import SettlementInfo from './component/SettlementInfo'
import ServiceAgreement from './component/ServiceAgreement'
import { insert, updateTask, getDetail } from '@/apis/taskManage'
import { formatMoney } from '@/utils/util'

export default {
  beforeRouteEnter(to, from, next) {
    if (!to.query.id) {
      to.meta.title = '新建任务'
    } else {
      if (to.query.isEditStatus) {
        to.meta.title = '编辑任务'
      } else {
        to.meta.title = '任务详情'
      }
    }
    next()
  },
  components: {
    BaseInfo,
    SettlementInfo,
    ServiceAgreement
  },
  mixins: [BasePage, mixins],
  data() {
    return {
      canNext: true,
      componentArr: ['BaseInfo', 'SettlementInfo', 'ServiceAgreement'],
      successComponentNum: 0,
      form: {},
      submitText: '创建',
      isLoading: false,
      id: '',
      isEditStatus: false
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.isEditStatus = this.$route.query.isEditStatus
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    next() {
      this.successComponentNum = 0
      this.componentArr.forEach(component => {
        this.$refs[component]['$refs'] &&
          this.$refs[component]['$refs']['form'].validate(valid => {
            if (valid) {
              Object.assign(this.form, this.$refs[component].form)
              this.successComponentNum++
            }
          })
      })
      if (this.successComponentNum === 3) {
        if (this.form.minMoney * 1 > this.form.maxMoney * 1) {
          this.$message.error('最小金额不能超过最大金额')
          return
        }
        this.form.money = this.form.minMoney + '-' + this.form.maxMoney
        this.canNext = false
        if (this.id) {
          updateTask({ id: this.id, ...this.form })
            .then(res => {
              if (res.data) {
                this.$message.success('编辑任务成功')
                this.$router.push({ name: 'TaskManage' })
              }
            })
            .catch(() => {
              this.canNext = true
            })
        } else {
          insert({ ...this.form })
            .then(res => {
              if (res.data) {
                this.$message.success('新建任务成功')
                this.$router.push({ name: 'TaskManage' })
              }
            })
            .catch(() => {
              this.canNext = true
            })
        }
      }
    },
    getDetail() {
      this.isLoading = true
      getDetail(this.id)
        .then(res => {
          this.componentArr.forEach(component => {
            const data = res.data
            const form = this.$refs[component]['form']
            Object.keys(form).forEach(key => {
              if (key === 'money') {
                const moneyArr = data.money.split('-')
                this.$refs[component]['form']['money'] = data['money']
                this.$refs[component]['form']['minMoney'] = this.isEditStatus ? moneyArr[0] : formatMoney(moneyArr[0])
                this.$refs[component]['form']['maxMoney'] = this.isEditStatus ? moneyArr[1] : formatMoney(moneyArr[1])
              } else if (key === 'settleType') {
                this.$refs[component]['form'][key] = data[key]['value']
              } else {
                this.$refs[component]['form'][key] = data[key]
              }
            })
          })
          this.submitText = '提交'
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-task {
  padding: 20px 24px;
  background-color: #fff;
  .edit-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
}
</style>
