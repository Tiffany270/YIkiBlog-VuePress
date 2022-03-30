<template>
  <block-container style="margin-bottom: 24px">
    <div class="payment-info">
      <div class="payment-info__number">平台批次号：{{ batchPayInfo.batchNo || '' }}</div>
      <div class="payment-info__container">
        <div class="info-title">
          <i class="info-title__dot" style="margin-bottom: 16px"></i>
          付款单信息
          <i class="info-title__dot" style="margin-top: 16px"></i>
        </div>
        <div class="info-content">
          <ul class="info-content__header">
            <li class="info-content__header--item">申请时间：{{ batchPayInfo.createTime }}</li>
            <!-- <li class="info-content__header--item">总笔数：{{ batchPayInfo.totalCount }}</li> -->
          </ul>
          <div class="info-content__body">
            <div class="pay-amount">
              <div class="pay-amount__item">
                <div class="pay-amount__item--label">实发金额（元）</div>
                <div class="pay-amount__item--number" style="color: #e6a422">
                  <i class="iconfont xbicon-rmb" style="font-size: 30px; margin-right: 10px"></i>
                  <span>{{ batchPayInfo.expspay | moneyConvert }}</span>
                </div>
              </div>
            </div>
            <div class="finished-info" v-if="hasPaid">
              <div class="finished-info__item">
                代发结果：成功{{ Number(batchPayInfo.successCount) || 0 }}笔、失败{{
                  Number(batchPayInfo.totalCount - batchPayInfo.successCount) || 0
                }}笔
              </div>
              <div class="finished-info__item">
                代发渠道：{{ batchPayInfo.payChannel && batchPayInfo.payChannel.label }}
              </div>
              <div class="finished-info__item">代发时间：{{ batchPayInfo.payDate }}</div>
            </div>
            <div class="unfinish-info" v-else>
              批次费用：{{ batchPayInfo.receivable | moneyConvert }}元（佣金实发{{
                batchPayInfo.expspay | moneyConvert
              }}+ 服务费及税金{{ batchPayInfo.serviceAndTaxAmount | moneyConvert }}）
            </div>
            <div class="pay-tip">
              <i
                class="iconfont"
                :class="currentBatchPayStatusInfo && currentBatchPayStatusInfo.icon"
                style="font-size: 20px; margin-right: 10px"
                :style="{ color: currentBatchPayStatusInfo && currentBatchPayStatusInfo.color }"
              ></i>
              <span>{{ currentBatchPayStatusInfo && currentBatchPayStatusInfo.warnText }}</span>
              <span
                v-if="
                  batchPayInfo.tollFlowStatusEnum && batchPayInfo.tollFlowStatusEnum.value === FLOW_STATUS_ENUM['驳回']
                "
                style="color: #cc3333"
                >{{ batchPayInfo.remark }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </block-container>
</template>

<script>
import BasePage from '@/mixins/BasePage'
import { FLOW_STATE_ENUM, FLOW_STATUS_ENUM } from '@/maps/enum'
export default {
  name: 'PaymentInfo',
  mixins: [BasePage],
  props: {
    batchPayInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      FLOW_STATUS_ENUM,
      FLOW_STATE_ENUM,
      batchPayStatus: Object.freeze({
        'PAY_PENDING&&PAY_CHECKING': {
          stageText: '已提交待审核',
          stateEnum: { lable: '待付款', value: 'PAY_PENDING' },
          statusEnum: { lable: '待审核', value: 'PAY_CHECKING' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '代发申请已提交成功，请完成审核'
        },
        'PAY_PENDING&&PAY_HANDLE': {
          stageText: '已审核未支付',
          stateEnum: { lable: '待付款', value: 'PAY_PENDING' },
          statusEnum: { lable: '待付款', value: 'PAY_HANDLE' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '代发申请已完成审核，请进行支付'
        },
        'INVALID&&PAY_CHECKING': {
          stageText: '待审核失效',
          stateEnum: { lable: '失效', value: 'INVALID' },
          statusEnum: { lable: '待审核', value: 'PAY_CHECKING' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '您的代发申请因超时未审核，现已经失效，请重新提交代发申请'
        },
        'INVALID&&PAY_HANDLE': {
          stageText: '待支付失效',
          stateEnum: { lable: '失效', value: 'INVALID' },
          statusEnum: { lable: '待付款', value: 'PAY_HANDLE' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '您的代发申请因超时未支付，现已经失效，请重新提交代发申请'
        },
        'INVALID&&PAID': {
          stageText: '挂起失效',
          stateEnum: { lable: '失效', value: 'INVALID' },
          statusEnum: { lable: '正在代发', value: 'PAID' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '您的代发申请因挂起超时，现已经失效，请重新提交代发申请'
        },
        'USELESS&&': {
          stageText: '作废',
          stateEnum: { lable: '作废', value: 'USELESS' },
          statusEnum: { lable: '', value: '' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '您当前的代发申请已作废，如需再次代发，请重新操作导入代发数据'
        },
        'PAY_PENDING&&PAY_CHECKING_FAIL': {
          stageText: '驳回',
          stateEnum: { lable: '待付款', value: 'PAY_PENDING' },
          statusEnum: { lable: '驳回', value: 'PAY_CHECKING_FAIL' },
          icon: 'xbicon-fail',
          color: '#cc3333',
          warnText: '代发申请已提交成功，但审核未通过，不通过原因：'
        },
        'PAY_PENDING&&PAID': {
          stageText: '正在代发',
          stateEnum: { lable: '待付款', value: 'PAY_PENDING' },
          statusEnum: { lable: '正在代发', value: 'PAID' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '代发申请付款成功，正在处理代发'
        },
        'PAY_SUCCESS&&PAY_SUCCESS': {
          stageText: '代发完成',
          stateEnum: { lable: '已完成', value: 'PAY_SUCCESS' },
          statusEnum: { lable: '已完成', value: 'PAY_SUCCESS' },
          icon: 'xbicon-success',
          color: '#03a92c',
          warnText: '代发处理完成'
        },
        'PAY_SUCCESS&&PAY_FAIL': {
          stageText: '代发完成',
          stateEnum: { lable: '已完成', value: 'PAY_SUCCESS' },
          statusEnum: { lable: '部分完成', value: 'PAY_FAIL' },
          icon: 'xbicon-success',
          color: '#03a92c',
          warnText: '代发处理完成'
        },
        'PAY_FAIL&&PAY_FAIL': {
          stageText: '代发部分完成',
          stateEnum: { lable: '部分完成', value: 'PAY_FAIL' },
          statusEnum: { lable: '部分完成', value: 'PAY_FAIL' },
          icon: 'xbicon-warningbig',
          color: '#e6a422',
          warnText: '代发处理部分成功，待修改失败数据申请重发'
        }
      })
    }
  },
  computed: {
    hasPaid() {
      let flag = false
      if (this.batchPayInfo.tollFlowStateEnum && this.batchPayInfo.tollFlowStateEnum.value) {
        flag =
          this.batchPayInfo.tollFlowStateEnum.value === FLOW_STATE_ENUM['已完成'] ||
          this.batchPayInfo.tollFlowStateEnum.value === FLOW_STATE_ENUM['部分完成']
      }
      return flag
    },
    currentBatchPayStatusInfo() {
      return (
        this.batchPayInfo.tollFlowStateEnum &&
        this.batchPayInfo.tollFlowStatusEnum &&
        this.batchPayStatus[
          this.batchPayInfo.tollFlowStateEnum.value + '&&' + this.batchPayInfo.tollFlowStatusEnum.value
        ]
      )
    }
  },

  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '@/styles/mixin';
@include b(payment-info) {
  @include e(number) {
    font-size: 14px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 24px;
  }
  @include e(container) {
    border: 1px solid #cc3333;
    border-radius: 9px;
    display: flex;
    @include b(info-title) {
      width: 60px;
      background-color: #cc3333;
      writing-mode: vertical-lr;
      border-radius: 9px 0 0 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      @include e(dot) {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
      }
    }
    @include b(info-content) {
      flex: 1;
      @include e(header) {
        padding: 0 24px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 55px;
        background: #f5d6d6;
        border-radius: 0 9px 0 0;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        @include m(item) {
          flex: 1;
        }
      }
      @include e(body) {
        box-sizing: border-box;
        padding: 24px 24px 0 24px;
        @include b(pay-amount) {
          border-bottom: 1px dashed #cc3333;
          @include e(item) {
            margin-bottom: 18px;
            @include m(label) {
              font-size: 14px;
              font-weight: 400;
              color: #666666;
              margin-bottom: 5px;
            }
            @include m(number) {
              font-size: 28px;
              font-weight: 400;
            }
          }
        }
        @include b(unfinish-info) {
          border-bottom: 1px dashed #cc3333;
          height: 70px;
          line-height: 70px;
          font-size: 14px;
          font-weight: 500;
        }
        @include b(finished-info) {
          border-bottom: 1px dashed #cc3333;
          box-sizing: border-box;
          padding: 15px 0;
          font-size: 14px;
          font-weight: 500;
          @include e(item) {
            line-height: 30px;
          }
        }
        @include b(pay-tip) {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 500;
          position: relative;
          .pay-time {
            font-size: blod;
            color: #cc3333;
          }
          .invalid-warning {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 20px;
            background: #f5d6d6;
            font-size: 12px;
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>
