<template>
  <div class="charge-formula">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="self-table">
      <tr style="background-color: #f2f2f2">
        <td style="width: 10%" class="charge-formula__td" v-if="hasSettle">结算方式</td>
        <td style="width: 20%" class="charge-formula__td">累计金额</td>
        <td style="width: 45%" class="charge-formula__td">计算公式</td>
        <td style="width: 20%" class="charge-formula__td">服务费</td>
        <td style="width: 5%; min-width: 80px" v-if="!isDetail">操作</td>
      </tr>
      <tr v-for="(item, index) in formulaData.conditionalLadders" :key="index">
        <td :rowspan="formulaData.conditionalLadders.length" v-if="index < 1 && hasSettle">
          <div>{{ SETTLETYPE_ENUM[formulaData.settleType] }}</div>
        </td>
        <td :rowspan="formulaData.conditionalLadders.length" v-if="index < 1">
          <div class="cumulative-amount">
            <div style="margin-right: 5px">月累计金额 =</div>
            <div>
              <el-select
                v-model="formulaData.amountItem"
                placeholder="请选择月累计金额"
                style="width: 140px"
                clearable
                size="small"
                :disabled="isDetail || !editAuthData.isUpdateServiceChargeFormula"
              >
                <el-option
                  v-for="item1 in ACCUMULATED_AMOUNT_OPTIONS"
                  :value="item1.value"
                  :label="item1.label"
                  :key="item1.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </td>
        <td>
          <div class="calculation-formula">
            <el-input
              class="start-amount"
              placeholder="请输入"
              v-model="item.minExpspay"
              style="width: 150px; margin-right: 5px"
              disabled
              size="small"
            >
              <template slot="append">元</template>
            </el-input>
            <el-select
              class="start-less"
              v-model="item.leftComparisonOperator"
              placeholder="请选择"
              style="width: 60px; margin-right: 5px"
              clearable
              disabled
              size="small"
            >
              <el-option value="LT" label="&lt;"></el-option>
              <el-option value="LE" label="≤"></el-option>
            </el-select>
            <div class="accumulate-amount" style="width: 45px; margin-right: 5px">月累计金额</div>
            <el-select
              class="end-less"
              v-model="item.rightComparisonOperator"
              placeholder="请选择"
              style="width: 90px; margin-right: 5px"
              size="small"
              clearable
              :disabled="
                isDetail ||
                !editAuthData.isUpdateServiceChargeFormula ||
                index + 1 !== formulaData.conditionalLadders.length ||
                formulaData.conditionalLadders.length === 5
              "
              @change="item.rightComparisonOperator === MATH_OPERATORS['无'] && (item.maxExpspay = '')"
            >
              <el-option value="NONE" label="无上限"></el-option>
              <el-option value="LT" label="&lt;" :disabled="formulaData.conditionalLadders.length === 5"></el-option>
              <el-option value="LE" label="≤" :disabled="formulaData.conditionalLadders.length === 5"></el-option>
            </el-select>
            <el-input
              class="end-amount"
              :placeholder="item.rightComparisonOperator === MATH_OPERATORS['无'] ? '' : '请输入'"
              v-model.number="item.maxExpspay"
              style="width: 150px"
              size="small"
              :disabled="
                item.rightComparisonOperator === MATH_OPERATORS['无'] ||
                isDetail ||
                !editAuthData.isUpdateServiceChargeFormula ||
                index + 1 !== formulaData.conditionalLadders.length ||
                formulaData.conditionalLadders.length === 5
              "
              @input="item.maxExpspay = handleMoneyInputDecimal($event)"
              @blur="
                Number(item.maxExpspay) <= Number(item.minExpspay) &&
                  ($message.warning('最大金额限制不得小于最小金额限制'), (item.maxExpspay = ''))
              "
            >
              <template slot="append">元</template>
            </el-input>
          </div>
        </td>
        <td>
          <div class="service-fee">
            <span style="margin-right: 10px">服务费 = 累计金额 * </span
            ><el-input
              placeholder="税率"
              v-model="item.serviceRate"
              size="small"
              style="width: 170px"
              :disabled="
                isDetail ||
                !editAuthData.isUpdateServiceChargeFormula ||
                index + 1 !== formulaData.conditionalLadders.length
              "
              @input="item.serviceRate = handleMoneyInputDecimal($event)"
            >
              <template slot="append">%</template>
            </el-input>
          </div>
        </td>
        <td v-if="!isDetail">
          <el-button
            type="text"
            style="color: #e6a422"
            v-if="
              formulaData.conditionalLadders.length === index + 1 &&
              formulaData.conditionalLadders.length < 5 &&
              item.rightComparisonOperator !== MATH_OPERATORS['无']
            "
            :disabled="!item.rightComparisonOperator || !item.maxExpspay || !String(item.serviceRate)"
            @click="handleAddFormula(index)"
            >增加</el-button
          >
          <el-button
            type="text"
            style="color: #cc3333"
            v-if="
              index !== 0 &&
              formulaData.conditionalLadders.length === index + 1 &&
              editAuthData.isUpdateServiceChargeFormula
            "
            @click="handleDeleteFormula(index)"
            >删除</el-button
          >
        </td>
      </tr>
    </table>
    <div class="charge-formula__warning" v-if="!value && !isDetail">请完成收费公式设置</div>
  </div>
</template>

<script>
import { MATH_OPERATORS } from '@/maps/enums/CommonEnum'
import { ACCUMULATED_AMOUNT_OPTIONS } from './config'
import { handleMoneyInputDecimal } from '@/utils/formatFormValue'
export default {
  name: 'ChargeFormulaForm',
  props: {
    value: Boolean,
    formulaData: {
      type: Object,
      default: () => {
        return {
          conditionalLadders: []
        }
      }
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    // 是否显示结算周期，控制项目和园区不同
    hasSettle: {
      type: Boolean,
      default: false
    },
    // 控制园区时是否可以编辑
    editAuthData: {
      type: Object,
      default: () => {
        return {
          isUpdateServiceChargeFormula: true
        }
      }
    }
  },
  data() {
    return {
      handleMoneyInputDecimal,
      MATH_OPERATORS,
      ACCUMULATED_AMOUNT_OPTIONS: Object.freeze(ACCUMULATED_AMOUNT_OPTIONS),
      SETTLETYPE_ENUM: {
        REAL_TIME: '实时结算',
        NO_REAL_TIME: '按月结算'
      }
    }
  },
  methods: {
    // 增加服务费计算公式
    handleAddFormula(index) {
      this.formulaData &&
        this.formulaData.conditionalLadders.push({
          minExpspay: this.formulaData.conditionalLadders[index].maxExpspay,
          leftComparisonOperator:
            this.formulaData.conditionalLadders[index].rightComparisonOperator === MATH_OPERATORS['小于']
              ? MATH_OPERATORS['小于等于']
              : MATH_OPERATORS['小于'],
          rightComparisonOperator: index + 1 === 4 ? MATH_OPERATORS['无'] : '',
          maxExpspay: '',
          serviceRate: ''
        })
    },
    // 删除服务费公式
    handleDeleteFormula(index) {
      this.formulaData.conditionalLadders.splice(index, 1)
    }
    // handleChangeEndLess(index) {
    //   if (this.formulaData.conditionalLadders[index].rightComparisonOperator === MATH_OPERATORS['无']) {
    //     // 清空当前最大金额
    //     this.formulaData.conditionalLadders[index].maxExpspay = ''
    //     // 删除后面公式
    //     if (this.formulaData.conditionalLadders.length > index + 1) {
    //       // eslint-disable-next-line prettier/prettier
    //       this.formulaData.conditionalLadders = this.formulaData.conditionalLadders.filter((itm, idx) => idx <= index)
    //       // eslint-disable-next-line prettier/prettier
    //     }
    //   } else {
    //     // 改变下一列的运算符
    //     if (this.formulaData.conditionalLadders.length > index + 1) {
    //       this.formulaData.conditionalLadders[index + 1].leftComparisonOperator =
    //         this.formulaData.conditionalLadders[index].rightComparisonOperator === MATH_OPERATORS['小于']
    //           ? MATH_OPERATORS['小于等于']
    //           : MATH_OPERATORS['小于']
    //     }
    //   }
    // },
    // handleChangeMaxExpspay(index, item) {
    //   if (Number(item.maxExpspay) <= Number(item.minExpspay)) {
    //     this.$message.warning('最大金额限制不得小于最小金额限制')
    //     setTimeout(() => {
    //       this.formulaData.conditionalLadders[index].maxExpspay = ''
    //     }, 500)
    //     return
    //   }
    //   if (this.formulaData.conditionalLadders[index + 1] === undefined) {
    //     return
    //   }
    //   this.formulaData.conditionalLadders[index + 1].minExpspay = item.maxExpspay
    //   this.handleChangeMaxExpspay(index + 1, this.formulaData.conditionalLadders[index + 1])
    // }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/index';
@include b(charge-formula) {
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: 12px;
  }

  ::-moz-placeholder {
    font-size: 12px;
  }

  :-ms-input-placeholder {
    font-size: 12px;
  }
  &__td::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  @include e(warning) {
    margin-top: 5px;
    font-size: 12px;
    color: #f56c6c;
  }
}
.cumulative-amount,
.calculation-formula,
.service-fee {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  padding: 10px 5px;
}
</style>
