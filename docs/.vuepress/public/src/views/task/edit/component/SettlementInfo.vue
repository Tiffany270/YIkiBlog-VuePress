<template>
  <div class="form-block-container">
    <div class="form-block-header">结算信息</div>
    <div class="form-block-content">
      <template v-if="isEditStatus">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" inline size="medium">
          <div class="box">
            <el-form-item label="结算方式：" prop="settleType">
              <el-select v-model="form.settleType" placeholder="请选择结算方式">
                <el-option
                  v-for="item in settleTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <div class="task-money">
              <el-form-item label="任务金额(元)：" prop="minMoney" style="width: 315px !important; margin-right: 0">
                <el-input v-model="form.minMoney" style="width: 110px" placeholder="最小金额"></el-input>
              </el-form-item>
              <span class="task--">-</span>
              <el-form-item prop="maxMoney" style="width: 100px">
                <el-input v-model="form.maxMoney" style="width: 110px !important" placeholder="最大金额"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item class="block" label="结算说明：" prop="settleDescription">
            <el-input
              type="textarea"
              v-model.trim="form.settleDescription"
              placeholder="请输入结算说明"
              maxlength="200"
              resize="none"
              rows="4"
            />
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form ref="form" :model="form" label-width="140px" inline size="medium">
          <el-form-item label="结算方式：">
            {{ form.settleType === 'TIME' ? '次结' : '月结' }}
          </el-form-item>
          <el-form-item label="任务金额（元）：" style="margin-bottom: 15px">
            {{ form.minMoney + ' - ' + form.maxMoney }}
          </el-form-item>
          <el-form-item class="block" label="结算说明：">
            {{ form.settleDescription }}
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
import { staticRules } from '@/utils/validate'
import mixins from './mixins'
// import { getSuggestedParkList } from '@/apis/complianceRiskControl'

export default {
  name: 'SettlementInfo',
  mixins: [mixins],
  data() {
    return {
      form: {
        settleType: '',
        minMoney: '',
        maxMoney: '',
        money: '',
        settleDescription: ''
      },
      settleTypeOptions: [
        {
          label: '次结',
          value: 'TIME'
        },
        {
          label: '月结',
          value: 'MONTH'
        }
      ],
      useYjbCompanyOptions: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      rules: {
        settleType: [staticRules('结算方式', 'change').required],
        minMoney: [staticRules('任务金额').required, staticRules('任务金额').limitNFloat(2, 0, 99999999)],
        maxMoney: [staticRules('任务金额').required, staticRules('任务金额').limitNFloat(2, 0, 99999999)],
        settleDescription: [staticRules('结算说明').required]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  .task-money {
    display: flex;
    .task-- {
      display: inline-block;
      height: 36px;
      line-height: 36px;
      margin-right: 5px;
    }
  }
}
/deep/.el-form-item__content {
  word-break: break-all;
}
</style>
